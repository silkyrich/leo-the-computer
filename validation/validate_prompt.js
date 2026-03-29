#!/usr/bin/env node
/**
 * validate_prompt.js
 * Checks a generation prompt against the issue spec before submitting to the API.
 *
 * Usage:
 *   node validate_prompt.js <issue_number> <prompt_file>
 *   node validate_prompt.js 01 prompts/issue_01.txt
 *
 * Or pipe a prompt:
 *   echo "your prompt here" | node validate_prompt.js 01
 */

const fs = require('fs')
const path = require('path')

const SPECS = JSON.parse(fs.readFileSync(path.join(__dirname, 'issue-specs.json'), 'utf8'))

function validatePrompt(issueNum, prompt) {
  const results = { pass: [], fail: [], warnings: [] }
  const text = prompt.toLowerCase()

  // Check global required terms
  for (const term of SPECS.required_in_every_issue.prompt_must_contain) {
    if (text.includes(term.toLowerCase())) {
      results.pass.push(`[GLOBAL] Contains "${term}"`)
    } else {
      results.fail.push(`[GLOBAL] Missing "${term}"`)
    }
  }

  // Check issue-specific required terms
  const issueSpec = SPECS.issues[issueNum]
  if (!issueSpec) {
    results.warnings.push(`No spec found for issue ${issueNum}`)
    return results
  }

  for (const term of issueSpec.prompt_must_contain) {
    if (text.includes(term.toLowerCase())) {
      results.pass.push(`[ISSUE ${issueNum}] Contains "${term}"`)
    } else {
      results.fail.push(`[ISSUE ${issueNum}] Missing "${term}"`)
    }
  }

  // Check panel count mentioned
  const panelCount = issueSpec.panel_count
  const panelMatches = (prompt.match(/panel/gi) || []).length
  if (panelMatches >= panelCount) {
    results.pass.push(`[PANELS] At least ${panelCount} panel mentions found (${panelMatches})`)
  } else {
    results.warnings.push(`[PANELS] Expected ${panelCount} panels, found ${panelMatches} "panel" mentions`)
  }

  // Check characters are mentioned
  for (const char of issueSpec.characters_required) {
    if (text.includes(char.toLowerCase())) {
      results.pass.push(`[CHARACTER] "${char}" mentioned`)
    } else {
      results.fail.push(`[CHARACTER] Required character "${char}" not mentioned`)
    }
  }

  // Check for zone label leak (known failure mode)
  if (/zone \d/i.test(prompt)) {
    results.fail.push(`[LAYOUT] Prompt contains "ZONE N" labels — these render as text in the image. Remove structural labels.`)
  }

  return results
}

function printResults(issueNum, results) {
  const total = results.pass.length + results.fail.length
  const score = results.pass.length
  console.log(`\n=== Prompt Validation — Issue ${issueNum} ===`)
  console.log(`Score: ${score}/${total}${results.warnings.length ? ` | ${results.warnings.length} warning(s)` : ''}`)
  console.log('')

  if (results.fail.length) {
    console.log('FAILURES:')
    results.fail.forEach(f => console.log(`  ✗ ${f}`))
    console.log('')
  }
  if (results.warnings.length) {
    console.log('WARNINGS:')
    results.warnings.forEach(w => console.log(`  ⚠ ${w}`))
    console.log('')
  }
  if (results.pass.length) {
    console.log('PASSING:')
    results.pass.forEach(p => console.log(`  ✓ ${p}`))
  }

  const status = results.fail.length === 0 ? '✅ READY TO GENERATE' : '❌ FIX BEFORE GENERATING'
  console.log(`\n${status}\n`)
  return results.fail.length === 0
}

// Main
const issueNum = process.argv[2]?.padStart(2, '0')
const promptFile = process.argv[3]

if (!issueNum) {
  console.error('Usage: node validate_prompt.js <issue_number> [prompt_file]')
  process.exit(1)
}

let prompt = ''
if (promptFile) {
  prompt = fs.readFileSync(promptFile, 'utf8')
} else {
  // Read from stdin
  prompt = fs.readFileSync('/dev/stdin', 'utf8')
}

const results = validatePrompt(issueNum, prompt)
const ok = printResults(issueNum, results)
process.exit(ok ? 0 : 1)
