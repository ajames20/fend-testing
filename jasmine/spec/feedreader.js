/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    // Set allFeedsArray === to the allFeeds array for looping
    var allFeedsArray = allFeeds;

    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        // Check if URL is not empty and that it is defined
        it('URL !== empty && URL to be defined', function () {
            allFeedsArray.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(0);
            });
        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        // Check that the feed.name !== empty and that it is defined
        it('should be defined and that the name !== empty.', function () {
            allFeedsArray.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {
        var body = document.body;
        var menuIcon = document.querySelector('.menu-icon-link');
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        // Check that menu is hidden 
        it('is hidden by default', function () {
            expect(body.classList.contains('menu-hidden')).toEqual(true);
        });
        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        // Check click functionality is working properly
        it('changes visibility when menuIcon is clicked', function () {
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toEqual(false);

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toEqual(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function () {
        /* TODO: Write a test that ensures when the loadFeed
             * function is called and completes its work, there is at least
             * a single .entry element within the .feed container.
             * Remember, loadFeed() is asynchronous so this test will require
             * the use of Jasmine's beforeEach and asynchronous done() function.
             */

        // Feed variable to look into the dom to see if children elements exsits
        var feed = document.getElementsByClassName('feed');

        // beforeEach pause for async calls to finish
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        // Check if the elements now exist in the DOM
        it('has been loaded and children are loaded properly', function (done) {
            // expect feed DOM nod to have children
            expect(feed['0'].children.length).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* TODO: Write a test that ensures when a new feed is loaded
             * by the loadFeed function that the content actually changes.
             * Remember, loadFeed() is asynchronous.
             */

        // Set variables to check innerHTML is different after loadFeed() function is called
        var initial;
        var current;

        // beforeEach pause for async calls to finish
        beforeEach(function (done) {
            //Load the first feed
            loadFeed(0, function () {
                // Save content of feed to variable
                initial = document.body.innerHTML;
                // Load second feed
                loadFeed(1, function () {
                    // Save content of new feed to variable
                    current = document.body.innerHTML;
                    done();
                });
            });
        });

        // Test to check if innerHTML content is different
        it('changes innerHTML content of page', function (done) {
            expect(initial !== current).toBe(true);
            done();
        });
    });

}());
