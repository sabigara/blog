import { HiInformationCircle, HiExclamationTriangle } from "react-icons/hi2"
import clsx from "clsx"
import React from "react"

import styles from "./styles.module.scss"

type SvgComponent = React.ComponentType<React.ComponentProps<"svg">>
type Status = "info" | "danger" | "warn"

type Props = {
  status?: Status
  title?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

const statusIconMap: { [S in Status]: SvgComponent } = {
  info: HiInformationCircle,
  danger: HiExclamationTriangle,
  warn: HiExclamationTriangle,
}

export default function Message({ status = "info", children, className }: Props) {
  const Icon = statusIconMap[status]
  const statusClass = styles[`--${status}`]
  return (
    <aside className={clsx(styles.Block, statusClass, className)}>
      <div>
        <Icon className={clsx(styles.icon, statusClass)} />
      </div>
      <div className={styles.text}>
        {children && <div className={styles.message}>{children}</div>}
      </div>
    </aside>
  )
}
