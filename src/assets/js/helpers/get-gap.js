export const getGap = (element = document.documentElement) => {
  const value = getComputedStyle(element).getPropertyValue("--gap").trim();
  return parseFloat(value) || 0;
}
