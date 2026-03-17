import GraphModal from "graph-modal";

export const modal = new GraphModal({
  isOpen: (modalInstance) => {
    if (modalInstance.modalContainer.dataset.graphTarget === "testimonial") {
      const btn = modalInstance.previousActiveElement;
      modalInstance.modalContainer.querySelector(
        "[data-full-testimonial-text]",
      ).innerHTML = btn.dataset.testimonial;
    }
  },
});
