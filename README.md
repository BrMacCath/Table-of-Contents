# Automatic Table of contents plugin

[![Version](https://img.shields.io/github/v/release/BrMacCath/Table-of-Contents?include_prereleases&label=latest&logo=github&labelColor=green)](https://github.com/BrMacCath/Table-of-Contents/releases)  [![Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=%23483699&label=downloads&query=%24%5B%22table-of-contents-automatic-but-compatible-with-publish%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json)](https://obsidian.md/plugins?search=TOC%20compatible%20with%20Publish) 

> Table of contents plugin that will be compatible with Publish.


# How to use

When the plugin is installed. press Ctrl + p to open the command window and then type create table of contents. For now this will create a table of contents for a file at the top of the file.

<img src="/assets/create table start.gif" />

You can create a table of contents at the cursor by using the create table of contents at cursor command.


<img src="/assets/table at cursor.gif" />

This table will update after you update a title. It does not do it after every keystroke though. If you change a title and then add text to a new line it may update then. Note that if there is an issue with updating, there is a command to update the table called update the table of contents.
# Set Up

You can adjust a some of the settings for your table of contents. Note that most settings do not adjust table of contents that have already been made. Those you will have to update manually. The one exception to this is the list of characters you want to remove from titles.

## Arrow labels

Current arrow Choices:
- Numbers: Index
- Arrows: >
- Bullet Points: -

This plugin allows you to create a table of contents that automatically updates and allows different arrow types or titles. The default arrow type is to number the entries in the table of contents. You can change it to bullet points with - or you can choose to have > as your arrow type. Below is how you change the default arrow types. 

<img src="/assets/change arrow type settings.gif" />

Note that this will not change the arrow types of the table of contents you have already made. You can change those manually as in the Table of contents header comment, there is the arrow type option. You can manually change that to the list type that you want.

<img src="/assets/manual arrow change.gif" />

## Title Change

Changing the default title has a similar approach. You can change the default table of contents in the setting folder.

<img src="/assets/change title from settings.gif" />

Note that you can still change individual titles on pages. The title on each page can be unique.

<img src="/assets/change title manually.gif" />

## Code Blocks

Some code blocks can be include comments that could be taken as a heading. For instance, in python comments are indicated with a #. To remove this line from our list on the table of contents, change the code blocks property to y to remove them from the table of contents. 

<img src="/assets/Show effect of codeblocks.gif" />

Note that this action is pointless if you don't have codeblocks in your notes. The default setting on these notes is n for no. If you regularly use code blocks in your notes, you should probably set the default to yes.

<img src="/assets/Change code blocks to yes in settings.gif" />

Note that this only effects future table of contents. You will have to manually alter tables that were already created.

<img src="/assets/alter codeblocks manually to yes.gif" />

## Character Removal from titles

If you wish to have text effect in titles but not have those characters show up in the table of contents, put them into the list of characters to remove from the title. Lets start with an example.

One instance is if you wish to italicise a word in a title. We do this using two astericks on either side of the words we want to see in italics.The italics will show up in the table of contents.

<img src="/assets/Show italics effect.gif" />

To remove this, put pairs of italics in the list of removed characters. Then the table of contents  will no longer show those characters. Note that * have a purpose in Regex expressions so escape characters are inserted to make sure you are removing the asteriks.

<img src="/assets/Remove astericks from title.gif" />


## Indentation

### Indentation starts with the shortest headings

Indentation will start with the level you choose to start with.

<img src="/assets/Shortest indent.gif" />

### Indentation levels are accounted for

Accounts for depths you introduce. 

<img src="/assets/Altering indents.gif" />

# Road map

-   [x] Create a first version of the plugin. This should just be able to make a table of contents.
-   [x] Create Demonstration file.
-   [x] Add a feature to allow for updating the table of contents.
-   [x] Create a feature that allows the app to recognise that there is a table of contents. This will allow the plugin to update the toc in a manner that will be recognised by obsidian publish.
-   [x] Add a feature that will automatically update the table of contents.
-   [x] Allow for different formats of table of contents.
-   [x] Allow for titles with footnotes or links to be referenced. (credit to u/spud80)
# Changelog

This project uses [semver](http://semver.org/).

| version | Date        | Notes                    |
| ------- | ----------  | ------------------------ |
| `3.2.0` | 2025-12-26  | Automatically removes text styling and footnotes from titles|
| `3.1.0` | 2025-11-20  | Added a command to update toc |
| `3.0.4` | 2025-11-19  | Extended escaped character list |
| `3.0.3` | 2025-11-17  | Fixed regex expression to allow more escaped characters be matched |
| `3.0.2` | 2025-11-14  | Fixed regex expressions to allow matching asterisks  |
| `3.0.1` | 2025-11-13  | Reduced unneccessary TOC checks |
| `3.0.0` | 2025-11-13  | Can now create a list of characters that won't be displayed in the toc|
| `2.5.1` | 2025-11-12  | If no headings start with #, push the table of contents back|
| `2.5.0` | 2025-11-12  | Allows altered indents in the table of contents  |
| `2.4.4 `| 2025-11-12  | Can remove codeBlocks from toc |
| `2.4.3` | 2025-11-09  | Allow manual changes of title |
| `2.4.2` | 2025-11-08  | Can manually set title for TOC |
| `2.4.1` | 2025-11-07  | Fixed a spacing issue with the new arrow types |
| `2.4.0` | 2025-11-07  | New arrow types and added a setting tab |
| `2.3.4` | 2025-11-05  | Added create TOC at cursor |
| `2.3.3` |             | Fixed a minor bug |
| `2.3.2` | 2025-07-03  | No longer modifies the table if nothing has changed |
| `2.3.1` | 2025-06-30  | Fixed a bug that sometimes clipped words people are writing |
| `2.3.0` | 2025-06-23  | No longer adds headings in callouts or quotes |
| `2.2.0` | 2025-05-05  | TOC automatically updates |
| `2.1.0` | 2024-12-22  | Added title to TOC       |
| `2.0.0` | 2024-12-17  | Allows toc to be updated |
| `1.1.0` | 2024-12-7   | First Release            |
| `1.0.0` | 2024-12-5   | Sample Plugin            |

## License

This project is released under the [MIT License](LICENSE).

# Support 

<a href="https://www.buymeacoffee.com/brmaccath" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
