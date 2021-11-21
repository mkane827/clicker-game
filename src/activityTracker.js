import state from "./State";
import { ACTIVITY_TRACKER, setText } from "./elements";
import { COFOUNDERS_AVAILABLE_LINES_OF_CODE } from "./constants";

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

export function linesOfCodeActivity(numLines, activity) {
  oneTimeActivity(() => state.linesOfCode >= numLines, activity);
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
  COFOUNDERS_AVAILABLE_LINES_OF_CODE,
  "Your scrum board is overflowing with tasks, time to get some cofounders"
);
linesOfCodeActivity(80, "Apply to the top incubators");
linesOfCodeActivity(105, "Get rejected from the top incubators");
linesOfCodeActivity(110, "Perfect your demo and pitch");
linesOfCodeActivity(
  130,
  "Lucky break a spot opened in your second choice incubator "
);
linesOfCodeActivity(145, "Search for product market fit");
linesOfCodeActivity(165, "Congradulations you have your first customer");
linesOfCodeActivity(
  178,
  "Look for more customers to confirm product market fit"
);
linesOfCodeActivity(
  195,
  "You’re having trouble finding product market fit lines of code now generate 50% less revenue",
  () => (state.revenueMultiplier -= 0.5)
);
oneTimeActivity(
  () => state.linesOfCode > 125 && state.money >= 5000,
  "It's time to make your first hire, pick wisely"
);
oneTimeActivity(
  () => state.linesOfCode > 220 && state.money >= 10000,
  "You need customers go hire a head of sales"
);
