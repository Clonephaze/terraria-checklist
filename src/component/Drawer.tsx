import React, { useState, useEffect } from 'react'
import { useDatabase } from '../context/DatabaseContext'
import { useDrawer } from '../context/DrawerContext'
import './Drawer.scss'
import Sections from './Sections'

// @ts-ignore
const LAST_BUILD_DATE = __BUILD_DATE__

type Theme = 'light' | 'dark' | 'system'

const getStoredTheme = (): Theme => {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return 'system'
}

const applyTheme = (theme: Theme): void => {
  if (theme === 'system') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', theme)
  }
}

const Drawer = (): JSX.Element => {
  const data = useDatabase()
  const { openDrawer, setOpenDrawer, setSelectedPage } = useDrawer()
  const [theme, setTheme] = useState<Theme>(getStoredTheme)

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const cycleTheme = (): void => {
    setTheme((current) => {
      if (current === 'system') return 'light'
      if (current === 'light') return 'dark'
      return 'system'
    })
  }

  const getThemeLabel = (): string => {
    if (theme === 'system') return 'Auto'
    if (theme === 'light') return 'Light'
    return 'Dark'
  }

  const getThemeIcon = (): string => {
    if (theme === 'system') return '⚙️'
    if (theme === 'light') return '☀️'
    return '🌙'
  }

  if (!data) return <></>
  const { chapters } = data

  const handleResetClick = (): void => {
    const confirmation = confirm('Are you sure you want to reset your progression?')
    if (!confirmation) return

    setSelectedPage({ type: 'chapter', content: chapters[0] })
    document.location = `#${chapters[0].slug}`
    window.scrollTo(0, 0)
    localStorage.clear()
  }

  const handleOverlayClick = (): void => {
    setOpenDrawer(false)
  }

  return (
    <>
      <div className={`overlay ${openDrawer ? 'show' : ''}`} onClick={handleOverlayClick}></div>
      <div className={`drawer ${openDrawer ? 'open' : ''}`}>
        <div className="logo">
          <img src="image/logo/tree.png" />
          <div className="logo-text">
            <span>Progression</span>
            <span>Checklist</span>
          </div>
        </div>
        <div className="sections">
          <a href="index.html" className="home">
            Home
          </a>
          <Sections data={data} />
        </div>
        <div className="danger-zone">
          <a className="reset" onClick={handleResetClick}>
            Reset progression
          </a>
        </div>

        <a className="theme-toggle" onClick={cycleTheme}>
          <span className="theme-label">Theme</span>
          <span className="theme-value">{getThemeIcon()} {getThemeLabel()}</span>
        </a>

        <a className="support-link" href="https://www.buymeacoffee.com/ewauq" target="_blank">
          <img src="image/icon/bmc-full-logo.svg" />
        </a>

        <div className="diminished">
          Updated on {LAST_BUILD_DATE} (
          <a href="https://ewauq.github.io/terraria-checklist/v1">change version</a>)
        </div>
        <div className="diminished">Ready for Terraria 1.4.4.9</div>
        <div className="diminished">
          Code by{' '}
          <a href="https://github.com/ewauq/terraria-checklist" target="_blank">
            ewauq
          </a>{' '}
          · Artwork by{' '}
          <a
            href="https://www.deviantart.com/vsewolod/art/Terraria-World-730563825"
            target="_blank"
          >
            Vsewolod
          </a>
        </div>
      </div>
    </>
  )
}

export default Drawer
