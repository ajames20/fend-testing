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

        // Check if URL is not empty and that it is defined
        it('URL !== empty && URL to be defined', function () {
            allFeedsArray.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        // Check that the feed.name !== empty and that it is defined
        it('should be defined and that the name !== empty.', function () {
            allFeedsArray.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function () {
        var body = document.body;
        var menuIcon = document.querySelector('.menu-icon-link');

        // Check that menu is hidden 
        it('is hidden by default', function () {
            expect(body.classList.contains('menu-hidden')).toEqual(true);
        });

        // Check click functionality is working properly
        it('changes visibility when menuIcon is clicked', function () {
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toEqual(false);

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toEqual(true);
        });
    });

    describe('Initial Entries', function () {
        // Set feed variable to select the .feed div
        var feed = document.getElementsByClassName('feed');
        // beforeEach pause for async calls to finish
        beforeEach(function (done) {
            // Test fails when called with loadFeed(4, done) because no index of 4 exists
            loadFeed(0, done);
        });

        // Check if the elements now exist in the DOM
        it('have at least one .entry element within the .feed container', function () {
            expect(feed[0].getElementsByClassName('entry')).not.toBe(0);
        });
    });

    describe('New Feed Selection', function () {

        // Set variables to check innerHTML is different after loadFeed() function is called
        var initial;
        var current;

        // beforeEach pause for async calls to finish
        beforeEach(function (done) {
            //Load the first feed
            loadFeed(0, function () {
                initial = document.querySelector('.feed').innerHTML;
                done();
            });
        });

        // Test to check if innerHTML content is different
        it('changes innerHTML content of page', function (done) {
            loadFeed(1, function () {
                current = document.querySelector('.feed').innerHTML;
                expect(current).not.toEqual(initial);
                done();
            });
        });
    });

}());
