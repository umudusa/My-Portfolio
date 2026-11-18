const metrics = {
  accuracy: {
    scores: [0.3000, 0.2875],
    format: (score) => (score * 100).toFixed(2) + "%",
    axisFormat: (score) => (score * 100) + "%",
    description: "Share of test examples classified correctly.",
    finding: "BERT led by 1.25 percentage points on test accuracy in this run."
  },
  f1: {
    scores: [0.3045, 0.2987],
    format: (score) => score.toFixed(4),
    axisFormat: (score) => String(score),
    description: "Average F1 score across classes, with equal weight per class.",
    finding: "BERT led by 0.0058 on macro F1 in this run."
  }
};

const metricButtons = document.querySelectorAll("[data-metric]");
const models = ["bert", "distil"];
const ticks = [0, 0.25, 0.5, 0.75, 1];

for (const button of metricButtons) {
  button.addEventListener("click", () => {
    const metric = metrics[button.dataset.metric];
    for (const option of metricButtons) {
      option.setAttribute("aria-pressed", String(option === button));
    }
    document.querySelector("#metric-description").textContent = metric.description;
    document.querySelector("#finding").textContent = metric.finding;
    models.forEach((model, index) => {
      const score = metric.scores[index];
      document.querySelector("#" + model + "-bar").style.width = (score * 100) + "%";
      document.querySelector("#" + model + "-value").textContent = metric.format(score);
    });
    document.querySelectorAll("#axis span").forEach((label, index) => {
      label.textContent = metric.axisFormat(ticks[index]);
    });
  });
}
