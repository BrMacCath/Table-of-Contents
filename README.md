# Automatic Table of contents plugin

[![Version](https://img.shields.io/github/v/release/BrMacCath/Table-of-Contents?include_prereleases&label=latest&logo=github&labelColor=green)](https://github.com/BrMacCath/Table-of-Contents/releases) <!-- [![Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=%23483699&label=downloads&query=%24%5B%22Table-of-Contents%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json)](https://obsidian.md/plugins?search=Table%20of%20Contents) -->

> Table of contents plugin that will be compatible with Publish.

# Set Up

This plugin allows you to create a table of contents that automatically updates and allows different arrow types. The default arrow type is to number the entries in the table of contents. You can change it to bullet points with - or you can choose to have > as your arrow type. Below is how you change the default arrow types. 

<img src="/assets/Change default arrow.gif" />

Note that this will not change the arrow types of the table of contents you have already made. You can change those manually as in the Table of contents header comment, there is the arrow type option. You can manually change that to the list type that you want.

<img src="/assets/Manual Arrow Change.gif" />


# How to use

When the plugin is installed. press Ctrl + p to open the command window and then type create table of contents. For now this will create a table of contents for a file at the top of the file.

<img src="/assets/example.gif" />

You can create a table of contents at the cursor by using the create table of contents at cursor command.


<img src="/assets/create Table at cursor.gif" />

# Road map

-   [x] Create a first version of the plugin. This should just be able to make a table of contents.
-   [x] Create Demonstration file.
-   [x] Add a feature to allow for updating the table of contents.
-   [x] Create a feature that allows the app to recognise that there is a table of contents. This will allow the plugin to update the toc in a manner that will be recognised by obsidian publish.
-   [x] Add a feature that will automatically update the table of contents.
-   [x] Allow for different formats of table of contents.

# Changelog

This project uses [semver](http://semver.org/).

| version | Date        | Notes                    |
| ------- | ----------  | ------------------------ |
| `2.4.1` | 2025-11-07|Fixed a spacing issue with the new arrow types|
| `2.4.0`| 2025-11-07| New arrow types and added a setting tab|
| `2.3.4`| 2025-11-05| Added create TOC at cursor|
|`2.3.3`  |             | Fixed a minor bug|
| `2.3.2` |2025-07-03   | No longer modifies the table if nothing has changed|
| `2.3.1` |2025-06-30   | Fixed a bug that sometimes clipped words people are writing|
| `2.3.0` | 2025-06-23  | No longer adds headings in callouts or quotes|
| `2.2.0` | 2025-05-05  | TOC automatically updates |
| `2.1.0` | 2024-12-22  | Added title to TOC       |
| `2.0.0` | 2024-12-17  | Allows toc to be updated |
| `1.1.0` | 2024-12-7   | First Release            |
| `1.0.0` | 2024-12-5   | Sample Plugin            |

## License

This project is released under the [MIT License](LICENSE).

# Support 

<a href="https://www.buymeacoffee.com/brmaccath" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
