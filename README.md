# Parker
Build and share your own network visualization

## What is Parker?
Parker is an open source, free and easy to use tool that enables anyone to build and share a network visualization using a Google spreadsheet to manage the data.

## Wait... network visualization?
The best definition we have found is this:
> Network visualisation is often used to visualise complex relationships between a huge amount of elements. A network visualisation displays undirected and directed graph structures. This type of visualization illuminates relationships between entities. Entities are displayed as round **nodes** and **lines** show the relationships between them. The vivid display of network nodes can highlight non-trivial data discrepancies that may be otherwise be overlooked.

As you may notice, there are two bold words in the quote above: nodes and lines. In Parker, we renamed lines to edges.

## Got it! How do I build one?
1. **Create a Google spreadsheet:** done with the first step.
1. **Describe your nodes:** you are going to need two columns and the column headers must be named as **id** and **label**. The id must be unique within the entire data set and the label is the text you want to display in the network for each node. Then, rename the actual tab to **nodes**.
1. **Describe your edges:** create a new tab and name it **edges**. Let's assume that in the step above you created a node with id **A** and a node with id **B** and let's also assume that the link comes out **from** A **to** B. In order to create a connection, you are going to need two columns and the column headers must be named as **from** and **to** and their values must be the ids of the nodes that you want to get connected. In this case: from = A and to = B. Optionally, you can create a third column named **label** to describe the relationship between the nodes.
1. **Go public**: it's time to publish your spreadsheet to the world. Go to `File > Publish to the Web` and press `Publish`. Now copy the URL from the browser's adress bar, paste it in the input that is floating at the top of the page, hit enter and voilà, your network is ready.

[Sample here](https://docs.google.com/spreadsheets/d/1llUmt8b9gB5haZ7RRbhZK9xRhBrhG7wo-q5I1IlPHuU/edit#gid=0)

## Cool! What else can I do?
Customize and share your network.

For the nodes you can change their background color, their label color, their shape and their size. For the edges you can change their color and the direction of their arrow.

Either clicking on the entity itself (node, edge) or clicking in the **settings** button placed in the navbar will open a box where you can manage the customization.

Last, but not least, share your network by clicking on the correspondent button. This will give you an iframe html code that you can paste within your personal blog or into a CMS editor. Either if you are a data journalism or a person interested in data visualization this tool will give you superpowers.