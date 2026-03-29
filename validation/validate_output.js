#!/usr/bin/env node
/**
 * validate_output.js
 * Reviews a generated image against the issue spec using Claude's vision.
 * Reads the image, sends it to Claude API, and checks for required output elements.
 *
 * Usage:
 *   node validate_output.js <issue_number> <image_path>
 *   node validate_output.js 01 pages/run-08-arc-v2/arc2_issue_01_the_wages_problem.png
 *
 * Requires: ANTHROPIC_API_KEY env var
 */

const fs = require('fs')
const path = require('path')

const SPECS = JSON.parse(fs.readFileSync(path.join(__dirname, 'issue-specs.json'), 'utf8'))

async function validateOutput(issueNum, imagePath) {
  const Anthropic = require('@anthropic-ai/sdk')
  const client = new Anthropic()

  const issueSpec = SPECS.issues[issueNum]
  if (!issueSpec) throw new Error(`No spec for issue ${issueNum}`)

  const requiredElements = [
    ...SPECS.required_in_every_issue.output_must_contain,
    ...issueSpec.output_must_contain,
  ]
  const forbiddenElements = SPECS.required_in_every_issue.output_must_not_contain

  const imageData = fs.readFileSync(imagePath)
  const base64 = imageData.toString('base64')
  const mimeType = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg'

  const checkList = requiredElements.map((e, i) => `${i + 1}. ${e}`).join('\n')
  const forbidList = forbiddenElements.map((e, i) => `${i + 1}. ${e}`).join('\n')

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: [
        { type: 'image', source: { type: 'base64', media_type: mimeType, data: base64 } },
        {
          type: 'text',
          text: `This is Issue ${issueNum}: "${issueSpec.title}" of the comic series "AI Isn't My Cup of Tea".

Check this image against the following requirements and respond ONLY with a JSON object.

REQUIRED elements (check each):
${checkList}

FORBIDDEN elements (flag if present):
${forbidList}

Respond with this exact JSON structure:
{
  "required": [
    { "element": "element description", "present": true/false, "note": "brief observation" }
  ],
  "forbidden": [
    { "element": "element description", "present": true/false, "note": "brief observation" }
  ],
  "panel_count": <number of comic panels you can see>,
  "has_colour": true/false,
  "title_text": "<exact title text you can read>",
  "issue_number_visible": true/false,
  "overall": "PASS" or "FAIL"
}`
        }
      ]
    }]
  })

  return JSON.parse(response.content[0].text)
}

function printOutputResults(issueNum, issueTitle, results) {
  console.log(`\n=== Output Validation — Issue ${issueNum}: ${issueTitle} ===`)
  console.log(`Title visible: "${results.title_text}"`)
  console.log(`Issue number visible: ${results.issue_number_visible ? '✓' : '✗'}`)
  console.log(`Panel count: ${results.panel_count}`)
  console.log(`Has colour: ${results.has_colour ? '❌ YES (bad)' : '✓ No'}`)
  console.log('')

  const failed = results.required.filter(r => !r.present)
  const passed = results.required.filter(r => r.present)
  const flagged = results.forbidden.filter(f => f.present)

  if (failed.length) {
    console.log('MISSING REQUIRED ELEMENTS:')
    failed.forEach(r => console.log(`  ✗ ${r.element}${r.note ? ` — ${r.note}` : ''}`))
    console.log('')
  }
  if (flagged.length) {
    console.log('FORBIDDEN ELEMENTS FOUND:')
    flagged.forEach(f => console.log(`  ❌ ${f.element}${f.note ? ` — ${f.note}` : ''}`))
    console.log('')
  }
  if (passed.length) {
    console.log('PRESENT:')
    passed.forEach(r => console.log(`  ✓ ${r.element}`))
  }

  console.log(`\n${results.overall === 'PASS' ? '✅ PASS' : '❌ FAIL'}\n`)
  return results.overall === 'PASS'
}

async function main() {
  const issueNum = process.argv[2]?.padStart(2, '0')
  const imagePath = process.argv[3]

  if (!issueNum || !imagePath) {
    console.error('Usage: node validate_output.js <issue_number> <image_path>')
    process.exit(1)
  }

  if (!fs.existsSync(imagePath)) {
    console.error(`Image not found: ${imagePath}`)
    process.exit(1)
  }

  const issueSpec = SPECS.issues[issueNum]
  if (!issueSpec) {
    console.error(`No spec for issue ${issueNum}`)
    process.exit(1)
  }

  try {
    console.log(`Checking ${path.basename(imagePath)} against spec for issue ${issueNum}...`)
    const results = await validateOutput(issueNum, imagePath)
    const ok = printOutputResults(issueNum, issueSpec.title, results)
    process.exit(ok ? 0 : 1)
  } catch (err) {
    console.error('Validation error:', err.message)
    process.exit(1)
  }
}

main()
