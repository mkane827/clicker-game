import state from "./State";
import { getEl, setText } from "./elements";
import { exposeHeadOfSales } from "./employees";
import { addToBoard } from "./scrumBoard";

const ACTIVITY_TRACKER = getEl(".activity-tracker");

/**
 * @param {string} activity
 */
export function addActivity(activity) {
  const newEl = document.createElement("li");
  setText(newEl, activity);
  ACTIVITY_TRACKER.append(newEl);
  ACTIVITY_TRACKER.scrollTop = ACTIVITY_TRACKER.scrollHeight;
}

export function oneTimeActivity(conditionFn, activity, onPost = () => {}) {
  const interval = setInterval(() => {
    if (conditionFn()) {
      addActivity(activity);
      onPost();
      clearInterval(interval);
    }
  }, 1);
}

export function linesOfCodeActivity(numLines, activity, onPost) {
  oneTimeActivity(() => state.linesOfCode >= numLines, activity, onPost);
}

linesOfCodeActivity(10, "No one knows about your startup idea, just you");
linesOfCodeActivity(
  15,
  "A few close friends say they like your idea you can't tell if they mean it or if they are just being nice"
);
linesOfCodeActivity(30, "Your parents do not understand your idea");
linesOfCodeActivity(
  40,
  "Coding all night pays off, your MVP is ready to share!"
);
linesOfCodeActivity(45, "Give your first demo");
linesOfCodeActivity(50, "Your demo didn't go as planned");
linesOfCodeActivity(
  60,
  "A few people are talking your idea is getting some traction"
);
linesOfCodeActivity(
  70,
  "Your scrum board is overflowing with tasks, time to get some cofounders",
  () =>
    addToBoard({
      name: "GET TWO COFOUNDERS",
      cost: "66% equity",
      description:
        "Get work done faster and split equity equally between all three cofounders",
      action: () => state.lowerTickMultiplier(0.3),
      isEquity: true,
      isDisabled: () => state.money < 100,
    })
);
linesOfCodeActivity(80, "Apply to the top incubators");
linesOfCodeActivity(105, "Get rejected from the top incubators");
linesOfCodeActivity(110, "Perfect your demo and pitch");
oneTimeActivity(
  () => state.linesOfCode > 125 && state.money >= 5000,
  "It's time to make your first hire, pick wisely"
);
linesOfCodeActivity(
  130,
  "Lucky break a spot opened in your second choice incubator "
);
linesOfCodeActivity(145, "Search for product market fit");
linesOfCodeActivity(165, "Congratulations you have your first customer", () =>
  state.addCustomers(1)
);
linesOfCodeActivity(
  178,
  "Look for more customers to confirm product market fit",
  () => state.addCustomers(2)
);
linesOfCodeActivity(
  195,
  "You’re having trouble finding product market fit. You're code now generates 50% less revenue",
  () => state.lowerRevenueMultiplier(5)
);
oneTimeActivity(
  () => state.linesOfCode > 260 && state.money >= 20000,
  "You need customers go hire a head of sales",
  () => exposeHeadOfSales()
);
