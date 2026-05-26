// ============================================
//   CORPORATE WORKFORCE SCHEDULER
// ============================================

// --- Employee ---
class Employee {
    constructor(id, name, skillLevel, availableHours) {
        this.id = id;
        this.name = name;
        this.skillLevel = skillLevel;
        this.availableHours = availableHours;
        this.assignedTasks = [];
        this.growthPoints = 0;
    }

    canHandle(task) {
        return (
            this.skillLevel === task.requiredRole &&
            this.availableHours >= task.duration
        );
    }

    assign(task) {
        this.assignedTasks.push(task);
        this.availableHours -= task.duration;
        this.growthPoints += task.complexity * 10;
    }
}

// --- Task ---
class Task {
    constructor(id, name, requiredRole, duration, complexity, preferredSlot, priority = "Medium") {
        this.id = id;
        this.name = name;
        this.requiredRole = requiredRole;
        this.duration = duration;
        this.complexity = complexity;
        this.preferredSlot = preferredSlot;
        this.priority = priority;
    }
}

// --- Slot ---
class Slot {
    constructor(name, maxHours) {
        this.name = name;
        this.maxHours = maxHours;
        this.usedHours = 0;
    }

    hasSpace(task) {
        return this.usedHours + task.duration <= this.maxHours;
    }

    assign(task) {
        this.usedHours += task.duration;
    }
}

// --- Scheduler ---
class Scheduler {
    constructor(employees, tasks, slots) {
        this.employees = employees;
        this.tasks = tasks;
        this.slots = slots;
        this.results = [];   // { task, employee, slot }
        this.failed = [];    // unassigned tasks
    }

    // Sort: High → Medium → Low, then hardest first
    sortTasks() {
        const rank = { High: 0, Medium: 1, Low: 2 };
        this.tasks.sort((a, b) =>
            rank[a.priority] - rank[b.priority] || b.complexity - a.complexity
        );
    }

    // Try preferred slot first, then others as fallback
    findSlot(task) {
        const preferred = this.slots.find(s => s.name === task.preferredSlot);
        const others = this.slots.filter(s => s.name !== task.preferredSlot);
        return [...(preferred ? [preferred] : []), ...others];
    }

    run() {
        this.sortTasks();

        for (const task of this.tasks) {
            let assigned = false;

            for (const slot of this.findSlot(task)) {
                if (!slot.hasSpace(task)) continue;

                const employee = this.employees.find(e => e.canHandle(task));
                if (!employee) continue;

                employee.assign(task);
                slot.assign(task);
                this.results.push({ task, employee, slot });
                assigned = true;
                break;
            }

            if (!assigned) this.failed.push(task);
        }

        this.report();
    }

    report() {
        const SECTION = {
            scheduleResults  : "\n========== SCHEDULE RESULTS ==========",
            employeeSummary  : "\n========== EMPLOYEE SUMMARY ==========",
            slotUsage        : "========== SLOT USAGE ==========",
            unassignedTasks  : "\n========== UNASSIGNED TASKS ==========",
            divider          : "\n======================================",
        };

        console.log(SECTION.scheduleResults + "\n");
        for (const { task, employee, slot } of this.results) {
            const fallback = slot.name !== task.preferredSlot ? ` (fallback)` : "";
            console.log(`[${task.priority}] ${task.name} → ${employee.name} | ${slot.name}${fallback}`);
        }

        console.log(SECTION.employeeSummary + "\n");
        for (const emp of this.employees) {
            console.log(`${emp.name} (${emp.skillLevel})`);
            console.log(`  Hours Left   : ${emp.availableHours}h`);
            console.log(`  Growth Points: ${emp.growthPoints}`);
            console.log(`  Tasks        : ${emp.assignedTasks.map(t => t.name).join(", ") || "None"}`);
            console.log();
        }

        console.log(SECTION.slotUsage + "\n");
        for (const slot of this.slots) {
            const pct = Math.round((slot.usedHours / slot.maxHours) * 100);
            const bar = "█".repeat(Math.round(pct / 10)).padEnd(10, "░");
            console.log(`  ${slot.name.padEnd(10)} ${bar} ${pct}% (${slot.usedHours}/${slot.maxHours}h)`);
        }

        if (this.failed.length) {
            console.log(SECTION.unassignedTasks + "\n");
            this.failed.forEach(t => console.log(`  ✗ ${t.name} — needs ${t.requiredRole}, ${t.duration}h`));
        }

        console.log(SECTION.divider + "\n");
    }
}

// ============================================
//   DATA
// ============================================

const employees = [
    new Employee(1, "Rahul", "Junior",  6),
    new Employee(2, "Priya", "Senior",  8),
    new Employee(3, "Amit",  "Manager", 5),
];

const tasks = [
    new Task(1, "UI Development",   "Junior",  2, 2, "Morning",   "Medium"),
    new Task(2, "API Architecture", "Senior",  3, 5, "Afternoon", "High"),
    new Task(3, "Client Meeting",   "Manager", 1, 3, "Evening",   "High"),
    new Task(4, "Security Audit",   "Senior",  2, 4, "Morning",   "High"),
    new Task(5, "UI Bug Fixes",     "Junior",  1, 1, "Afternoon", "Low"),
    new Task(6, "Sprint Planning",  "Manager", 2, 2, "Morning",   "Medium"),
];

const slots = [
    new Slot("Morning",   6),
    new Slot("Afternoon", 8),
    new Slot("Evening",   4),
];

// ============================================
//   RUN
// ============================================

new Scheduler(employees, tasks, slots).run();
