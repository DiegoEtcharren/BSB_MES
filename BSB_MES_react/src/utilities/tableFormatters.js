// Helper to generate user initials for the avatar
export const getUserInitials = (firstName, lastName) => {
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
  return `${firstInitial}${lastInitial}` || "U"; // 'U' for Unknown fallback
};

// Helper to handle Role badge styling and icons
export const getRoleFormatting = (role) => {
  const normalizedRole = role?.toLowerCase() || "";

  switch (normalizedRole) {
    case "engineering":
      return {
        wrapperClass: "bg-indigo-50 text-indigo-700 border border-indigo-200",
        icon: "engineering",
        iconClass: "text-indigo-500"
      };
    case "supervisor":
      return {
        wrapperClass: "bg-amber-50 text-amber-700 border border-amber-200",
        icon: "supervisor_account",
        iconClass: "text-amber-500"
      };
    case "operator":
      return {
        wrapperClass: "bg-slate-100 text-slate-700 border border-slate-200",
        icon: "precision_manufacturing",
        iconClass: "text-slate-500"
      };
    default:
      return {
        wrapperClass: "bg-slate-100 text-slate-600",
        icon: "person",
        iconClass: "text-slate-400"
      };
  }
};

// Helper to handle Status badge styling
export const getStatusFormatting = (isActive) => {
  // Check if isActive is true, 1, or the string "active"
  const active = isActive === true || isActive === 1 || String(isActive).toLowerCase() === "active";

  if (active) {
    return {
      wrapperClass: "bg-emerald-100 text-emerald-700",
      dotClass: "bg-emerald-500",
      label: "Active"
    };
  } else {
    return {
      wrapperClass: "bg-red-50 text-red-700",
      dotClass: "bg-red-500",
      label: "Inactive"
    };
  }
};

export const formatDate = (dateString) => {
  const normalizedDateString = dateString.includes('T') ? dateString : dateString.replace(/-/g, '/');
  const date = new Date(normalizedDateString);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
  const year = date.getFullYear();

  return `${month} ${year}`;
}