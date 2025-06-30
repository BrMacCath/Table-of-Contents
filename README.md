# Automatic Table of contents plugin

[![Version](https://img.shields.io/github/v/release/BrMacCath/Table-of-Contents?include_prereleases&label=latest&logo=github&labelColor=green)](https://github.com/BrMacCath/Table-of-Contents/releases) <!-- [![Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=%23483699&label=downloads&query=%24%5B%22Table-of-Contents%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json)](https://obsidian.md/plugins?search=Table%20of%20Contents) -->

> Table of contents plugin that will be compatible with Publish.

# How to use

When the plugin is installed. press Ctrl + p to open the command window and then type create table of contents. For now this will create a table of contents for a file at the top of the file.

<img src="/assets/example.gif" />

# Road map

-   [x] Create a first version of the plugin. This should just be able to make a table of contents.
-   [x] Create Demonstration file.
-   [x] Add a feature to allow for updating the table of contents.
-   [x] Create a feature that allows the app to recognise that there is a table of contents. This will allow the plugin to update the toc in a manner that will be recognised by obsidian publish.
-   [x] Add a feature that will automatically update the table of contents.
-   [ ] Allow for different formats of table of contents.

# Changelog

This project uses [semver](http://semver.org/).

| version | Date       | Notes                    |
| ------- | ---------- | ------------------------ |
| `2.3.1` |2025-06-30| Fixed a bug that sometimes clipped words people are writing|
| `2.3.0` | 2025-06-23 | No longer adds headings in callouts or quotes|
| `2.2.0` | 2025-05-05 | TOC automatically updates |
| `2.1.0` | 2024-12-22 | Added title to TOC       |
| `2.0.0` | 2024-12-17 | Allows toc to be updated |
| `1.1.0` | 2024-12-7  | First Release            |
| `1.0.0` | 2024-12-5  | Sample Plugin            |

## License

This project is released under the [MIT License](LICENSE).
