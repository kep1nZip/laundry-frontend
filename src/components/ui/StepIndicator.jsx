import "../../styles/components/StepIndicator.css";

/**
 * Horizontal numbered step indicator used at the top of multi-step flows.
 *
 * @param {{id: number, label: string}[]} steps
 * @param {number} currentStep - 1-indexed id of the active step
 */
function StepIndicator({ steps, currentStep }) {
  return (
    <ol className="step-indicator" aria-label="Progres pendaftaran">
      {steps.map((step) => {
        const isCompleted = step.id < currentStep;
        const isActive = step.id === currentStep;
        const state = isCompleted ? "completed" : isActive ? "active" : "upcoming";

        return (
          <li key={step.id} className={`step-indicator__item step-indicator__item--${state}`}>
            <span className="step-indicator__circle" aria-hidden="true">
              {isCompleted ? (
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 10.5L8.33333 14L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                step.id
              )}
            </span>
            <span className="step-indicator__label">{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}

export default StepIndicator;