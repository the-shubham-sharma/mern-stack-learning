const express = require("express");
const app = express();

var users = [
    {
        name: "harkirat",
        kidneys: [
            { health: false },
            { health: true }
        ]
    }
];

app.use(express.json());

app.get("/", function (req, res) {
    const hakuKidney = users[0].kidneys;
    const numberOfKidneys = hakuKidney.length;
    let healthyKidneys = 0;

    for (let i = 0; i < numberOfKidneys; i++) {
        if (hakuKidney[i].health) {
            healthyKidneys++;
        }
    }

    const unhealthyKidneys = numberOfKidneys - healthyKidneys;

    res.json({
        numberOfKidneys,
        healthyKidneys,
        unhealthyKidneys
    });
});

// Add a new kidney
app.post("/", function (req, res) {
    const isHealthy = req.body.isHealthy;

    users[0].kidneys.push({
        health: isHealthy
    });

    res.json({ message: "Kidney added successfully!" });
});

// Update all kidneys to be healthy
app.put("/", function (req, res) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].health = true;
    }
    res.json({ message: "All kidneys are now healthy!" });
});

// Remove all unhealthy kidneys
app.delete("/", function (req, res) {
    const nextKidneys = [];

    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (users[0].kidneys[i].health) {
            nextKidneys.push({ health: true });
        }
    }

    users[0].kidneys = nextKidneys;

    res.json({ message: "Unhealthy kidneys removed!" });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
