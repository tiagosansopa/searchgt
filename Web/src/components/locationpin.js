import React from 'react';
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
import style from './locationpin.module.css'


const Locationpin = ({ text }) => {
    return(
    <div className={style.pin}>
      <Icon icon={locationIcon} className={style.pinicon} />
      <p className={style.pintext}>{text}</p>
    </div>
  )}

export default Locationpin;