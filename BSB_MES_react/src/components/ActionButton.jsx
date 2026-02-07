const ActionButton = ({ title, onClick, icon = "add" }) => {

  if (!title) {
    return <div className="empty-action-placeholder"></div>;
  }

  return (
    <button
      onClick={onClick}
      className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-md font-bold text-sm flex items-center gap-2 shadow-lg shadow-red-500/20 transition-all active:scale-[0.98] cursor-pointer"
    >
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
      <p>{title.toUpperCase()}</p>
    </button>
  );
};

export default ActionButton;
