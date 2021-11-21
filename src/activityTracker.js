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
  70,
  "Your scrum board is overflowing with tasks, time to get some cofounders"
);
linesOfCodeActivity(80, "Apply to the top incubators");
linesOfCodeActivity(105, "Get rejected from the top incubators");
linesOfCodeActivity(110, "Perfect your demo and pitch");
linesOfCodeActivity(
  130,
  "Lucky break a spot opened in your second choice incubator "
);
oneTimeActivity(
  () => state.linesOfCode > 125 && state.money >= 5000,
  "It's time to make your first hire, pick wisely"
);
linesOfCodeActivity(145, "Search for product market fit");
linesOfCodeActivity(165, "Congradulations you have your first customer");
linesOfCodeActivity(
  178,
  "Look for more customers to confirm product market fit"
);
linesOfCodeActivity(
  195,
  "You’re having trouble finding product market fit lines of code now generate 50% less revenue"
);
oneTimeActivity(
  () => state.linesOfCode > 220 && state.money >= 10000,
  "You need customers go hire a head of sales"
);
