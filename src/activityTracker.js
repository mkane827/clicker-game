import { TICK_SPEED } from "./constants";
import state from "./State";
import { ACTIVITY_TRACKER, setText } from "./elements";

export const ACTIVITIES = {
  FIRST_PRODUCT: "Hello, Silicon Valley",
  FIRST_DESIGN: "Ooo that's pretty, you should build it!",
};

export function addActivity(activity) {
  const newEl = document.createElement("li");
  setText(newEl, activity);
  ACTIVITY_TRACKER.append(newEl);
  ACTIVITY_TRACKER.scrollTop = ACTIVITY_TRACKER.scrollHeight;
}

export function oneTimeActivity(conditionFn, activity) {
  const interval = setInterval(() => {
    if (conditionFn()) {
      addActivity(activity);
      clearInterval(interval);
    }
  }, TICK_SPEED);
}

export function linesOfCodeActivity(numLines, activity) {
  oneTimeActivity(() => state.linesOfCode >= numLines, activity);
}

linesOfCodeActivity(10, "No one knows about your startup idea, just you");
linesOfCodeActivity(15, "A few close friends say they like your idea");
linesOfCodeActivity(
  250,
  "Coding all night pays off, your MVP is ready to share!"
);
linesOfCodeActivity(300, "Give your first demo");
linesOfCodeActivity(
  325,
  "A few people are talking your idea is getting some traction"
);
linesOfCodeActivity(
  400,
  "Your scrum board is overflowing with tasks, time to get some cofounders"
);
oneTimeActivity(
  () => state.linesOfCode > 400 && state.money >= 5000,
  "It's time to make your first hire, pick wisely"
);
