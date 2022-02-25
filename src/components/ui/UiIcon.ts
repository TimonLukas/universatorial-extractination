import { OhVueIcon, addIcons } from "oh-vue-icons"
import {
  HiDocumentText,
  HiDownload,
  HiLogout,
  HiUpload,
  HiSolidLightningBolt,
  HiSolidChip,
} from "oh-vue-icons/icons"

export const icons = {
  HiLogout,
  HiDocumentText,
  HiDownload,
  HiUpload,
  HiSolidLightningBolt,
  HiSolidChip,
}

addIcons(...Object.values(icons))

export default OhVueIcon
