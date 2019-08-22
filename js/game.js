/**
 * WCLN.ca
 * Hockey Matchup
 * @author Shaun Agostinho (shaunagostinho@gmail.com)
 * July 2019
 */

let FPS = 24;
let gameStarted = false;
let STAGE_WIDTH, STAGE_HEIGHT;
let stage = new createjs.Stage("gameCanvas"); // canvas id is gameCanvas

/*TODO:
    - Show explanation screen
    - Start with the first category and load all the cards associated with it
    - Show the amount of money the person has to start:
        - 5 X $2.00
        - 3 X $1.00
        - 4 X $.25
        - 5 X $.10
        - 10 X $.05
    - When the player chooses an item, it will prompt them with a screen for them to
    choose which types of change they will have to use.
    - If a player chooses the wrong amount, it will show and error and have them try again.
    - If a player chooses the correct amount, it will prompt them to do it with a new category.
    ^ that repeats for every category until it's gone through all of them
    - There will also be back buttons for if they want to change the item they choose.
    - When it has gone through all categories, it will show the amount of money they used.

 */

// bitmap letiables
let background;

let json = {
    categories: [{
        name: "Vegetables",
        options: [
            {
                name: "Carrot",
                price: 1.35,
                image: "/img/vegetables/carrot.png"
            },
            {
                name: "Peas",
                price: 2.00,
                image: "/img/vegetables/peas.png"
            },
            {
                name: "Asparagus",
                price: 3.30,
                image: "/img/vegetables/asparagus.png"
            },
            {
                name: "Corn on the Cob",
                price: 0.50,
                image: "/img/vegetables/corncob.png"
            },
            {
                name: "Broccoli",
                price: 1.90,
                image: "/img/vegetables/broccoli.png"
            }
        ]
    },
        {
            name: "Protein",
            options: [
                {
                    name: "Steak",
                    price: 3.25,
                    image: "/img/protein/steak.png"
                },
                {
                    name: "Chicken",
                    price: 2.50,
                    image: "/img/protein/chicken.png"
                },
                {
                    name: "Bacon",
                    price: 1.75,
                    image: "/img/protein/bacon.png"
                },
                {
                    name: "Ribs",
                    price: 2.00,
                    image: "/img/protein/ribs.png"
                },
                {
                    name: "Eggs (2)",
                    price: 2.00,
                    image: "/img/protein/eggs.png"
                }
            ]
        },
        {
            name: "Fruit",
            options: [
                {
                    name: "Pineapple",
                    price: 1.40,
                    image: "/img/fruit/pineapple.png"
                },
                {
                    name: "Apple",
                    price: 0.75,
                    image: "/img/fruit/apple.png"
                },
                {
                    name: "Blueberries",
                    price: 2.25,
                    image: "/img/fruit/blueberries.png"
                },
                {
                    name: "Kiwi",
                    price: 0.75,
                    image: "/img/fruit/kiwi.png"
                },
                {
                    name: "Cantaloupe",
                    price: 2.00,
                    image: "/img/fruit/cantaloupe.png"
                }
            ]
        },
        {
            name: "Drinks",
            options: [
                {
                    name: "Apple Juice",
                    price: 1.75,
                    image: "/img/drinks/applejuice.png"
                },
                {
                    name: "Chocolate Milk",
                    price: 2.00,
                    image: "/img/drinks/chocolatemilk.png"
                },
                {
                    name: "Yop",
                    price: 1.50,
                    image: "/img/drinks/yop.png"
                },
                {
                    name: "Hot Chocolate",
                    price: 2.25,
                    image: "/img/drinks/hotchocolate.png"
                }
            ]
        },
        {
            name: "Dessert",
            options: [
                {
                    name: "Ice Cream",
                    price: 2.10,
                    image: "/img/dessert/icecream.png"
                },
                {
                    name: "Brownie",
                    price: 1.85,
                    image: "/img/dessert/brownie.png"
                },
                {
                    name: "Pie",
                    price: 2.75,
                    image: "/img/dessert/pie.png"
                },
                {
                    name: "Pudding",
                    price: 1.95,
                    image: "/img/dessert/pudding.png"
                }
            ]
        },
    ]
};

/*
 * Called by body onload
 */
function init() {
    STAGE_WIDTH = parseInt(document.getElementById("gameCanvas").getAttribute("width"));
    STAGE_HEIGHT = parseInt(document.getElementById("gameCanvas").getAttribute("height"));

    // init state object
    stage.mouseEventsEnabled = true;
    stage.enableMouseOver(); // Default, checks the mouse 20 times/second for hovering cursor changes

    setupManifest(); // preloadJS
    startPreload();

    gameStarted = false;

    stage.update();
}

/*
 * Displays the end game screen and score.
 */
function endGame() {
    //todo show win screen
    gameStarted = false;
}

function setupManifest() {
    manifest = [
        {
            src: "img/bg.png",
            id: "background"
        }
    ];
}

function startPreload() {
    let preload = new createjs.LoadQueue(true);
    preload.installPlugin(createjs.Sound);
    preload.on("fileload", handleFileLoad);
    preload.on("progress", handleFileProgress);
    preload.on("complete", loadComplete);
    preload.on("error", loadError);
    preload.loadManifest(manifest);
}

// not currently used as load time is short
function handleFileProgress(event) {
    /*progressText.text = (preload.progress*100|0) + " % Loaded";
    progressText.x = STAGE_WIDTH/2 - progressText.getMeasuredWidth() / 2;
    stage.update();*/
}

function handleFileLoad(event) {
    console.log("A file has loaded of type: " + event.item.type);
    // create bitmaps of images
    if (event.item.id == "background") {
        background = new createjs.Bitmap(event.result);
    }
}

function loadError(evt) {
    console.log("Error!", evt.text);
}

/*
 * Displays the start screen.
 */
function loadComplete(event) {
    console.log("Finished Loading Assets");

    createjs.Ticker.setFPS(FPS);
    createjs.Ticker.addEventListener("tick", update); // call update function

    stage.addChild(background);

    initGraphics();
}

/**
 * Load the basic stuff
 *
 */
function initGraphics() {
    gameStarted = true;
}

/**
 * Update the stage. (Tween Ticker)
 *
 * @param event
 */

function update(event) {
    stage.update(event);
}