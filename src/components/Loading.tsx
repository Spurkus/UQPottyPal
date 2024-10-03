/**
 * Loading component
 *
 * This component renders a loading spinner.
 *
 * @param {Object} props - The component props
 * @param {number} [props.height=42] - The height of the loading spinner
 * @param {number} [props.width=42] - The width of the loading spinner
 * @returns {JSX.Element} The rendered Loading component
 */
const Loading = ({ height = 42, width = 42 }: { height?: number; width?: number }) => {
  return (
    <div className="items-center self-center rounded-xl text-base">
      <div className="flex">
        <span className="loading loading-spinner" style={{ width, height }}></span>
      </div>
    </div>
  );
};

export default Loading;
