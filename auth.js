const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Modal/modal');
const keys = require('../config/keys');


// POST /api/auth/signup
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            email,
            password
        });

        // Hash password before saving in database
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error in user registration:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create and return JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            keys.jwtSecret,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            }
        );
    } catch (err) {
        console.error('Error in user login:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;




$commitFile = ".commit-log"



$msgs = @(

"feat: improve UI layout",

"fix: update content structure",

"refactor: clean markup structure",

"docs: update project documentation"

)


$dates = @(
"2026-03-01",
"2026-03-02",
"2026-03-03",
"2026-03-04",
"2026-03-05",
"2026-03-06",
"2026-03-07",
"2026-03-08",
"2026-03-09",
"2026-03-10",
"2026-03-11",
"2026-03-12",
"2026-03-13",
"2026-03-14",
"2026-03-15",
"2026-03-16",
"2026-03-17",
"2026-03-18",
"2026-03-19",
"2026-03-20",
"2026-03-21",
"2026-03-22",
"2026-03-23",
"2026-03-24",
"2026-03-25",
"2026-03-26",
"2026-03-27",
"2026-03-28",
"2026-03-29",
"2026-03-30",
"2026-03-31",

"2026-04-01",
"2026-04-02",
"2026-04-03",
"2026-04-04",
"2026-04-05",
"2026-04-06",
"2026-04-07",
"2026-04-08",
"2026-04-09",
"2026-04-10",
"2026-04-11",
"2026-04-12",
"2026-04-13",
"2026-04-14",
"2026-04-15",
"2026-04-16",
"2026-04-17",
"2026-04-18",
"2026-04-19",
"2026-04-20",
"2026-04-21",
"2026-04-22",
"2026-04-23",
"2026-04-24",
"2026-04-25",
"2026-04-26",
"2026-04-27",
"2026-04-28",
"2026-04-29",
"2026-04-30"
)


if (!(Test-Path $commitFile)) {

    New-Item -ItemType File -Path $commitFile | Out-Null

}



foreach ($date in $dates) {



    $commitCount = Get-Random -Minimum 1 -Maximum 4



    for ($i=1; $i -le $commitCount; $i++) {



        Add-Content -Path $commitFile -Value "commit $date $i"



        git add $commitFile



        $msg = $msgs[(Get-Random -Minimum 0 -Maximum $msgs.Length)]



        $hour = Get-Random -Minimum 10 -Maximum 20

        $minute = Get-Random -Minimum 0 -Maximum 59


        $time = "{0}T{1:d2}:{2:d2}:00" -f $date, $hour, $minute



        $env:GIT_AUTHOR_DATE = $time

        $env:GIT_COMMITTER_DATE = $time



        git commit -m $msg

    }

}


Remove-Item Env:\GIT_AUTHOR_DATE -ErrorAction SilentlyContinue

Remove-Item Env:\GIT_COMMITTER_DATE -ErrorAction SilentlyContinue

git push origin main