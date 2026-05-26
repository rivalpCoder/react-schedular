/*

===========================================
 CORPORATE WORKFORCE SCHEDULER SYSTEM
===========================================

SCENARIO:
A company has:
- Junior Developers
- Senior Developers
- Managers

Tasks:
- Development
- Code Review
- Client Meeting
- Deployment

System Goal:
Assign employees to proper work slots
based on:
- Skill Level
- Availability
- Working Hours
- Task Priority

===========================================
 SYSTEM DESIGN COMPONENTS
===========================================

1. Employee Entity
2. Task Entity
3. Time Slot Entity
4. Scheduler Engine
5. Constraint Validation
6. Resource Allocation
7. Growth Tracking

===========================================
*/




// ===========================================
// EMPLOYEE CLASS
// ===========================================

class Employee {

    constructor(
        id,
        name,
        role,
        skillLevel,
        availableHours
    ) {

        this.id = id;
        this.name = name;
        this.role = role;

        // Junior / Senior / Manager
        this.skillLevel = skillLevel;

        // Daily available working hours
        this.availableHours = availableHours;

        // Assigned Tasks
        this.assignedTasks = [];

        // Growth score
        this.growthPoints = 0;
    }

    assignTask(task) {

        this.assignedTasks.push(task);

        this.availableHours -= task.duration;

        // Growth logic
        this.growthPoints += task.complexity * 10;
    }
}




// ===========================================
// TASK CLASS
// ===========================================

class Task {

    constructor(
        id,
        taskName,
        requiredRole,
        duration,
        complexity,
        preferredSlot
    ) {

        this.id = id;
        this.taskName = taskName;

        // Required role
        this.requiredRole = requiredRole;

        // Working hours needed
        this.duration = duration;

        // Complexity Level
        this.complexity = complexity;

        // Morning / Afternoon / Evening
        this.preferredSlot = preferredSlot;
    }
}




// ===========================================
// SLOT CLASS
// ===========================================

class Slot {

    constructor(name, maxHours) {

        this.name = name;

        // Total hours available in slot
        this.maxHours = maxHours;

        this.usedHours = 0;

        this.assignedEmployees = [];
    }

    canAssign(task) {

        return (
            this.usedHours + task.duration
            <= this.maxHours
        );
    }

    assignEmployee(employee, task) {

        this.assignedEmployees.push({
            employee,
            task
        });

        this.usedHours += task.duration;
    }
}




// ===========================================
// SCHEDULER ENGINE
// ===========================================

class CorporateScheduler {

    constructor() {

        this.employees = [];
        this.tasks = [];
        this.slots = [];
    }



    // ===========================
    // CREATE EMPLOYEES
    // ===========================

    createEmployees() {

        this.employees.push(
            new Employee(
                1,
                "Rahul",
                "Frontend Developer",
                "Junior",
                6
            )
        );

        this.employees.push(
            new Employee(
                2,
                "Priya",
                "Backend Developer",
                "Senior",
                8
            )
        );

        this.employees.push(
            new Employee(
                3,
                "Amit",
                "Project Manager",
                "Manager",
                5
            )
        );
    }



    // ===========================
    // CREATE TASKS
    // ===========================

    createTasks() {

        this.tasks.push(
            new Task(
                1,
                "UI Development",
                "Junior",
                2,
                2,
                "Morning"
            )
        );

        this.tasks.push(
            new Task(
                2,
                "API Architecture",
                "Senior",
                3,
                5,
                "Afternoon"
            )
        );

        this.tasks.push(
            new Task(
                3,
                "Client Meeting",
                "Manager",
                1,
                3,
                "Evening"
            )
        );
    }



    // ===========================
    // CREATE TIME SLOTS
    // ===========================

    createSlots() {

        this.slots.push(
            new Slot("Morning", 6)
        );

        this.slots.push(
            new Slot("Afternoon", 8)
        );

        this.slots.push(
            new Slot("Evening", 4)
        );
    }




    // =====================================
    // CONSTRAINT CHECKING LOGIC
    // =====================================

    isValidAssignment(
        employee,
        task,
        slot
    ) {

        // Role Matching Constraint
        const roleMatch =
            employee.skillLevel === task.requiredRole;

        // Availability Constraint
        const enoughHours =
            employee.availableHours >= task.duration;

        // Slot Capacity Constraint
        const slotAvailable =
            slot.canAssign(task);

        return (
            roleMatch &&
            enoughHours &&
            slotAvailable
        );
    }




    // =====================================
    // MAIN SCHEDULING ALGORITHM
    // =====================================

    runScheduler() {

        console.log(
            "\n=================================="
        );

        console.log(
            " CORPORATE TASK SCHEDULING STARTED "
        );

        console.log(
            "==================================\n"
        );



        // Greedy Scheduling Logic

        for (const task of this.tasks) {

            let assigned = false;

            for (const employee of this.employees) {

                for (const slot of this.slots) {

                    // Preferred Slot Check
                    if (
                        slot.name !== task.preferredSlot
                    ) {
                        continue;
                    }

                    // Constraint Validation
                    if (
                        this.isValidAssignment(
                            employee,
                            task,
                            slot
                        )
                    ) {

                        employee.assignTask(task);

                        slot.assignEmployee(
                            employee,
                            task
                        );

                        console.log(
                            `${task.taskName}
assigned to
${employee.name}
during ${slot.name}`
                        );

                        assigned = true;

                        break;
                    }
                }

                if (assigned) {
                    break;
                }
            }

            if (!assigned) {

                console.log(
                    `Could not assign task:
${task.taskName}`
                );
            }
        }

        this.displayFinalReport();
    }




    // =====================================
    // FINAL SYSTEM REPORT
    // =====================================

    displayFinalReport() {

        console.log(
            "\n=================================="
        );

        console.log(
            " FINAL EMPLOYEE REPORT "
        );

        console.log(
            "==================================\n"
        );



        for (const employee of this.employees) {

            console.log(
                "--------------------------------"
            );

            console.log(
                `Employee: ${employee.name}`
            );

            console.log(
                `Role: ${employee.skillLevel}`
            );

            console.log(
                `Remaining Hours:
${employee.availableHours}`
            );

            console.log(
                `Growth Points:
${employee.growthPoints}`
            );

            console.log(
                "Assigned Tasks:"
            );

            if (
                employee.assignedTasks.length === 0
            ) {

                console.log("No Tasks");

            } else {

                for (
                    const task
                    of employee.assignedTasks
                ) {

                    console.log(
                        `- ${task.taskName}`
                    );
                }
            }

            console.log(
                "--------------------------------\n"
            );
        }
    }
}




// ===========================================
// MAIN EXECUTION
// ===========================================

const scheduler =
    new CorporateScheduler();

scheduler.createEmployees();

scheduler.createTasks();

scheduler.createSlots();

scheduler.runScheduler();
