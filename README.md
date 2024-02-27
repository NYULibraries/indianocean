# Indian Ocean Digital Collection

NYU Indian Ocean Collection, for scholars who may need access to the Indian Ocean materials.

## Prerequisites

Node version: >=18.14.1

## Installation

In order to run the site locally, clone the repo and run:

```zsh
npm install
```

In your local environment, set up your query parameters in an .env file:

```
# urls
PUBLIC_APPURL = <localized_url>
PUBLIC_DISCOVERYURL = <discovery_api_url>
PUBLIC_VIEWERURL = <viewer_url>

# item descriptions
PUBLIC_ROWS = <displayed_items>
PUBLIC_STARTITEMS = <start_of_query>
PUBLIC_ALLITEMS = <num_items>
PUBLIC_COLLECTIONCODE = 'io'
PUBLIC_LANGUAGE = <language>
PUBLIC_BOOK = 'dlts_book'
PUBLIC_MAP = 'dlts_map'
```
## Preview

To preview locally run:

```zsh
npm run dev
```
