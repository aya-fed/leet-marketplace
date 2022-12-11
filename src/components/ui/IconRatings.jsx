import { FaRegSmile, FaRegMeh, FaRegFrown } from "react-icons/fa";

const PositiveIcon = ({ className, size }) => <FaRegSmile className={className} size={size} />;
const NeutralIcon = ({ className, size }) => <FaRegMeh className={className} size={size} />;
const NegativeIcon = ({ className, size }) => <FaRegFrown className={className} size={size} />;

export { PositiveIcon, NeutralIcon, NegativeIcon };
