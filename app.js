const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const port = 5000;

// Connect to the database
const db = new sqlite3.Database('./dua_main.sqlite', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the dua_main database.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

// GET DUAS
app.get('/duas', (req, res) => {
    try {
        db.all('SELECT * FROM dua', (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                res.json(rows)
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// GET CATEGORY
app.get('/category', (req, res) => {
    db.all('SELECT * FROM category ', (err, rows) => {
        if (err) {
            console.error('Error querying the database:', err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
            // console.log(rows);
        }
    });
});



// GET SUB CATEGORY
app.get('/subcategory/:cat_id/:subcat_id', (req, res) => {
    const cat_id = req.params.cat_id;
    const subcat_id = req.params.subcat_id;

    db.all('SELECT * FROM sub_category WHERE cat_id = ? AND subcat_id = ?', [cat_id, subcat_id], (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(rows);
      }
    });
});

  
app.get('/subcategory', (req, res) => {
    try {
        db.all('SELECT * FROM sub_category ', (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                res.json(rows)
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// GET SINGLE CATEGORY DUA
app.get('/category/:cat_id', (req, res) => {
    const category = req.params.cat_id;
    db.all('SELECT * FROM dua WHERE cat_id = ?', [category], (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(rows);
      }
    });
  });