# bg-scraper

# To Add crawler Type,
Add new crawler to crawlTypes in controller/crawler.js
Add new crawler file to crawlers/
Add new crawler to factory/crawler.js

Add new test to test/crawlers
Add new test pages to freeze test/helper/freeze-lists.json

# TODO
Support multiple pages of search result
implement more search handler
Restructure in functional style (or use RxJS)
Implement utility functions for cheerio objects
Update freezer to support form request and update divedice frozen pages
Could have been better to use command pattern for crawler jobs and builder pattern for populating them?