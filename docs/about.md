The Polirural Model builder is an online application for creating 
problem trees, mindmaps, workflow diagrams etc. 
It's in a way similar to yEd editor, but simpler to use and aligned to Polirural needs.

It can be used to draw problem trees or diagrams of different policies and their 
interactions with the key performance indicators and drivers of change. These are the terms used 
in the project, but the actual diagram node types and sets of them can be configured and 
used for other kinds of models such as the system dynamics models created in Stella software. 
We don't aim to implement the full functionality of Stella in our tool, but nevertheless
 it can be used as a collaborative graph sketching and brainstorming environment in workshops 
 or desk research.
It's possible to combine multiple sets of nodes in the same diagram, even though too many 
node types might make the graph hard to comprehend.  

The main building blocks of Model builder are
+ Diagram drawing tool
+ Map window
+ Semantic search window  

## Diagram tool
Allows creating blocks or nodes and linking them together with edges - arrows. 
It can be used to describe different processes and their steps, problems and their subproblems 
and other directed or undirected graphs. Under the hood the tool uses vis.js library to 
visualize the graphs and we have developed extra interfaces and APIs to create and store the 
graphs building blocks and link them to a diagram model which the users are free to share 
or create new models. Models can be protected via a security layer similar to google docs 
where the editing rights are assigned to particular users via their e-mail addresses.  

Each of the nodes in the graph can be assigned  
+ title
+ description
+ keywords
+ geographical features or objects on the map  

Graph edges (arrows) can be assigned 
+ label
+ value which visually appears as line thickness.
+ description

In both cases descriptions usually contain a link to a document, presentation or research article
which the inclusion of this particular node or edge was based on.  

## Semantic search
Whenever the user clicks a graph node, semantic search is being executed using the keywords 
supplied for this particular node using semex API. The results show different library sources 
using full text search or documents that contain one of the keywords in their description or title.
Also polarity (positivity or negativity) is shown using green-yellow-red color gradient.
The relevant semantic query results can then be furthermore bookmarked by the user. Bookmarking process 
assigns this particular library result to the current model (graph diagram). 
An overview list or in other words curated reading list of bookmarked library sources can be produced this way.  

One interesting idea which we would like to explore is using this search result augmentation to furthermore 
improve the semantic search models by providing feedback to the machine learning models implemented in Semex.io.  

## Map
The map window can be used in various ways which are common for most hslayers-ng 
library based applications. Some functionality is entirely new and developed specifically for Polirural project.
One of them is linking the diagram nodes to objects on the map - points, lines, polygons.  

The objects can be styled and stored as layers on our servers. This is provided by a software called 
Layman which turns vector data layers such as geojson or shape files into OGC compliant Web map services (WMS) 
which can then be used in other GIS software. 
The data can be uploaded to Layman through its API or user interface such as this tool.  

The uploaded layers can be augmented with other publicly available data sources such as WMS 
provided by governmental or non-governmental organizations and organized into sets or in other words map compositions.
Previously we have developed a geojson schema to describe such compositions available 
at: [https://github.com/hslayers/hslayers-ng/wiki/Composition-schema](https://github.com/hslayers/hslayers-ng/wiki/Composition-schema).  

In near future we would like to introduce a real-time collaboration aspect for map compositions to enable 
multiple users to work on the same composition in parallel. 



