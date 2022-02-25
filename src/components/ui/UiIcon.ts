import { OhVueIcon, addIcons } from "oh-vue-icons"
import {
  HiDocumentText,
  HiDownload,
  HiLogout,
  HiUpload,
} from "oh-vue-icons/icons"

export const icons = { HiLogout, HiDocumentText, HiDownload, HiUpload }

addIcons(...Object.values(icons))

export default OhVueIcon
