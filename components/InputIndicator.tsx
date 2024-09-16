import {
  ArrowPathIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

type Props = {
  isResultsLoading: boolean;
  isPopupOpen: boolean;
};

export const InputIndicator = ({ isResultsLoading, isPopupOpen }: Props) => {
  if (isResultsLoading) {
    return <ArrowPathIcon className="text-primary w-6 h-6 spin" />;
  }

  // TODO: this could be animated with rotation and single chevron
  if (isPopupOpen) {
    return <ChevronUpIcon className="text-primary w-6 h-6" />;
  } else {
    return <ChevronDownIcon className="text-primary w-6 h-6" />;
  }

  return null;
};
