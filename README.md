# MTG Intership Project
One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To run the project locally, you will need to have Node.js and npm installed.
```
https://www.npmjs.com/get-npm
```

### Installing

If you want to see the source code or run the project on local.

You can clone the git repository of the project using the command :

```
git clone https://github.com/bpugnaire/mtg-synth-project.git
```

Then, to install all dependencies, run : 
```
npm install
```

You can now launch the project on your browser with :
```
npm start
```
This environment allow you to dynamically tweek the source code and immediatly see how it affects the project.

## Adding new sound files

If you want to add new sound files, you should first convert them in .wav.

You can now store you file in ~/public/audio.

Then you have to manually add the name of the file to the adequate json file : samples.json for sandbox tab, hindustani-samples.json for hindustani tab or turkish-samples.json for turkish tab.

Be carefull, your sound file name has to match the name you add to the json file.
-

For example if my sound file is named tabla-dha.wav in the json file I should write :

```
[...,
"tabla-dha",
...]
```

### Adding new presets

For Users :
-
Download the loop you just created as a .json file and send it to the MTG.

For Administrators :
-
You have to store the .json file in ~/src/presets and then update the list of presets manually following the same rules as in the "Adding new soud files" section which means using the exact same names for both the preset file and the name inside the preset list file.


## Author

* **Baptiste Pugnaire** - Disruptive Student at Ecole Centrale Marseille, France

## Acknowledgments

* Hat tip to https://github.com/n1k0/tinysynth whose code was, for me, used as a starting point for both developing the app and learning web developing techniques and react in general.

