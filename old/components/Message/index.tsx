import { HiOutlineInformationCircle, HiOutlineExclamationTriangle } from "react-icons/hi2"
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
  info: HiOutlineInformationCircle,
  danger: HiOutlineExclamationTriangle,
  warn: HiOutlineExclamationTriangle,
}

export default function Message({ status = "info", title, children, className }: Props) {
  const Icon = statusIconMap[status]
  const statusClass = styles[`--${status}`]
  return (
    <aside className={clsx(styles.container, statusClass, className)}>
      <span className={styles.icon}>{<Icon />}</span>
      {title && <div className={clsx(styles.title)}>{title}</div>}
      {children && <div className={styles.message}>{children}</div>}
    </aside>
  )
}
