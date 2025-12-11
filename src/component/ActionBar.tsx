import React from 'react'
import { useDrawer } from '../context/DrawerContext'
import './ActionBar.scss'

const ActionBar = (): JSX.Element => {
  const { openDrawer, setOpenDrawer } = useDrawer()

  const handleDarkModeClick = (): void => {
    // todo: implement dark mode
  }

  const handleDrawerMenuClick = (): void => {
    setOpenDrawer(!openDrawer)
    window.scrollTo(0, 0)
  }

  return (
    <header className="action-bar">
      <button className="drawer-toggle" onClick={handleDrawerMenuClick} aria-label="Open menu" aria-expanded={openDrawer}></button>
      <span className="title">🌳 Progression Checklist ☀️</span>
      <button className="dark-mode-toggle" onClick={handleDarkModeClick} aria-hidden="true"></button>
    </header>
  )
}

export default ActionBar
