#!/usr/bin/env node

import AdmZip from 'adm-zip'
import fs from 'node:fs'
import fg from 'fast-glob'

fs.mkdirSync('.build/v2', { recursive: true })
fs.mkdirSync('.build/v3', { recursive: true })

copyFiles()
compileManifests()
createExtensionZips()

function createExtensionZips() {
  const zip2 = new AdmZip()
  zip2.addLocalFolder('.build/v2', '')
  zip2.writeZip('.build/v2.zip')

  const zip3 = new AdmZip()
  zip3.addLocalFolder('.build/v3', '')
  zip3.writeZip('.build/v3.zip')
}


function compileManifests() {
  const manifestTemplate = JSON.parse(fs.readFileSync('manifest.template.json', 'utf8'))

  manifestTemplate.manifest_version = 2
  fs.writeFileSync('.build/v2/manifest.json', JSON.stringify(manifestTemplate, null, 2))

  manifestTemplate.manifest_version = 3
  fs.writeFileSync('.build/v3/manifest.json', JSON.stringify(manifestTemplate, null, 2))
}

function copyFiles() {
  const files = fg.sync(
    [
      'src/contentscript.js',
      '*.png'
    ]
  )

  files.forEach(file => {
    fs.copyFileSync(file, `.build/v2/${file.replace('src/', '')}`)
    fs.copyFileSync(file, `.build/v3/${file.replace('src/', '')}`)
  })
}

