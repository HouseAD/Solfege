var abcjsL = 32;
var timeSignature = document.getElementById("id_musictheory_timesignature").value;
switch (timeSignature) {
    case "2/2":
        measureLength = 32;
        break;  
    case "3/2":
        measureLength = 48;
        break;
    case "2/4":
        measureLength = 16;
        break;  
    case "3/4":
        measureLength = 24;
        break;
    case "4/4":
        measureLength = 32;
        break;   
    case "5/4":
        measureLength = 40;
        break;    
    case "6/8":
        measureLength = 24;
        break;  
    case "7/8":
        measureLength = 28;
        break;
    default :
        timeSignature = "4/4";
        measureLength = 32;
        break;                              
}
var answerConst = "M:"+ timeSignature + "\n" +
                  "K: style=rhythm\n" +
                  "L:1/" + abcjsL + "\n";
var answer = "";
var durationTot = 0;
var measures = document.getElementById("id_musictheory_measurecount").value;
var measureTot = 0;

var synth = new ABCJS.synth.CreateSynth();

function addNote(duration) {
    var l_timesignature = document.getElementById("id_musictheory_timesignature").value;

    console.log("Duration Totaal: " + durationTot);
    console.log("Measure Totaal: " + measureTot);  
    console.log("ABC waarde L: " + abcjsL);
    console.log("Measures: " + measures);          
    if (measureTot == measures) {
        alert("Maximaal aantal maten gebruikt");
    }
    else {
        if (durationTot + duration > measureLength) {
            alert("Waarde past niet binnen de maat");
        }
        else {
            if(answer.slice(-1) == ">" || answer.slice(-2) == ">-" || answer.slice(-2) == ">|") {
                duration_value = duration * 2
                answer = answer + "A" + duration_value;
            }
            else {
                console.log("Timesignature: " + l_timesignature);
                if (l_timesignature == "6/8" || l_timesignature == "7/8") {
                   switch(duration) {
                       case 4:
                            console.log("Komt in deze switch");
                            if(answer.slice(-6) == "A4A4A4") {
                                answer = answer + "A" + duration + " ";
                            }
                            else {
                                answer = answer + "A" + duration;
                            }
                            break;   
                        default:                         
                            answer = answer + "A" + duration;
                    }
                }
                else {
                    switch(duration) {
                        case 1:
                            if(answer.slice(-14) == "A1A1A1A1A1A1A1") {
                                answer = answer + "A" + duration + " ";
                            }
                            else {
                                answer = answer + "A" + duration;
                            }
                            break;   
                        case 2:
                            if(answer.slice(-6) == "A2A2A2") {
                                answer = answer + "A" + duration + " ";
                            }
                            else {
                                answer = answer + "A" + duration;
                            }
                            break;                      
                        case 4:
                            if(answer.slice(-2) == "A4") {
                                answer = answer + "A" + duration + " ";
                            }
                            else {
                                answer = answer + "A" + duration;
                            }
                            break;
                        default:
                            answer = answer + "A" + duration;
                    }
                }
            }

            durationTot = durationTot + duration;

            //  Noten groeperen per hele tel
            
            if (l_timesignature == "6/8" || l_timesignature == "7/8") {
                if(durationTot > 0 && durationTot % 12 == 0) {
                    if (answer.slice(-1) != " ") {
                        answer = answer + " ";
                    }
                }                        
            }
            else {
                if(durationTot > 0 && durationTot % 8 == 0) {
                    if (answer.slice(-1) != " ") {
                        answer = answer + " ";
                    }
                } 
            }

            console.log("ABC string: " + answer);
            console.log("Totale duur: " + durationTot);
            console.log("Maatlengte: " + measureLength);

            if (durationTot == measureLength) {
                measureTot = measureTot + 1;
                durationTot = 0;
                answer = answer + "|";
                renderABCString(answerConst + answer)
            }
            else {
                renderABCString(answerConst + answer)
            }
        }
        switch (l_timesignature) {
            case "2/4":
            case "3/4":
            case "4/4":
                if (answer.search('A32') != -1 || answer.search('A16') != -1 || answer.search('A8') != -1) {
                    document.getElementById("id_musictheory_abctempo").value = "130";
                }   
                if (answer.search('A4') != -1) {
                    document.getElementById("id_musictheory_abctempo").value = "100";
                }
                if (answer.search('A2') != -1) {
                    document.getElementById("id_musictheory_abctempo").value = "70";
                } 
                if (answer.search('A1') != -1) {
                    document.getElementById("id_musictheory_abctempo").value = "50";
                } 
                break;
            case "2/2":
            case "3/2":
                if (answer.search('A32') || answer.search('A16') != -1) {
                    document.getElementById("id_musictheory_abctempo").value = "130";
                }  
                if (answer.search('A8')) {
                    document.getElementById("id_musictheory_abctempo").value = "100";
                }                 
                if (answer.search('A4') != -1) {
                    document.getElementById("id_musictheory_abctempo").value = "70";
                }
                if (answer.search('A2') != -1) {
                    document.getElementById("id_musictheory_abctempo").value = "50";
                } 
                break;     
            case "6/8":
                document.getElementById("id_musictheory_abctempo").value = "60"; 
                break;
            case "7/8":
                document.getElementById("id_musictheory_abctempo").value = "100"; 
                break;
            default:
                document.getElementById("id_musictheory_abctempo").value = "130"; 
        }       
    }
}

function addRest(duration) {
    if (measureTot == measures) {
        alert("Maximaal aantal maten gebruikt");
    }
    else {
        if (durationTot + duration > measureLength) {
            alert("Waarde past niet binnen de maat");
        }
        else {
            answer = answer + "z" + duration;
            durationTot = durationTot + duration;
            console.log("ABC string: " + answer);
            console.log("Totale duur: " + durationTot);
            if (durationTot == measureLength) {
                measureTot = measureTot + 1;
                answer = answer + "|";
                durationTot = 0;
                renderABCString(answerConst + answer)
            }
            else {
                renderABCString(answerConst + answer)
            }
        }
    }
}

function addPoint() {
    console.log("Laatste karakter is: ", answer.slice(-1));
    console.log("Laatste karakter is:", answer.slice(-2));
    if (answer.slice(-1) == "|") {
        answer = answer.slice(0, answer.length - 2);
        console.log("De waarde van answer is: " + answer);
    } 
    // console.log("De waarde van answer.slice(-3) is: ", answer.slice(-3));
    // console.log("De waarde van answer.slice(-2) is: ", answer.slice(-2));   
    if (answer.slice(-3) == 32 || answer.slice(-3) == 16) {
        duration = answer.slice(-3)
    }
    else {
        duration = answer.slice(-2)
    }
    console.log("Duur van laatse noot: " + duration);

    console.log("Waarde van measureTot is: " + measureTot);
    console.log("Waarde van measures is: " + measures);
    console.log("Waarde van durationTot is: " + durationTot);
    console.log("Waarde van measureLength is: " + measureLength);
    if (measureTot == measures) {
        alert("Maximaal aantal maten gebruikt");
    }
    else { 
        // console.log("Punt gebruikt? (-6) ", answer.slice(-6, -5));
        // console.log("Punt gebruikt? (-5) ", answer.slice(-5, -4));
        // console.log("Punt gebruikt? (-4) ", answer.slice(-4, -3));
        // console.log("Punt gebruikt? (-3) ", answer.slice(-3, -2));
        // console.log("Punt gebruikt? (-2) ", answer.slice(-2, -1));
        if (answer.slice(-6, -5) == ">" ||answer.slice(-5, -4) == ">" || answer.slice(-4, -3) == ">" || answer.slice(-3, -2) == ">") {
            duration = duration / 2;
            console.log("Waarde van duration na . is: " + duration)    
        }

        if (parseInt(durationTot) + (parseInt(duration) / 2) > parseInt(measureLength)) {
            alert("Waarde past niet binnen de maat");
        }
        else {
            answer = answer + ">";
            durationTot = durationTot + (duration / 2);
            console.log("Duur van .: " + duration / 2);
            console.log("ABC string: " + answer);
            console.log("Totale duur: " + durationTot);
            if (durationTot == measureLength) {
                answer = answer + "|";
                durationTot = 0;
                measureTot = measureTot + 1;
                renderABCString(answerConst + answer)
            }
            else {
                renderABCString(answerConst + answer)
            }
        }
    }
}

function addTies(duration) {
    answer = answer + "-";
    if (durationTot == measureLength) {
        answer = answer + "|";
        durationTot = 0;
        renderABCString(answerConst + answer)
    }
    else {
        renderABCString(answerConst + answer)
    }
}

function cutNote() {
    console.log("Answer bij begin functie: " + answer);
    console.log(answer.slice(-1));
    console.log(answer.slice(-2));
    let insertAtPosition;

    switch(answer.slice(-1)) {
        case "|":
            insertAtPosition = answer.length - 4;
            break;
        case " ":
            insertAtPosition = answer.length - 3;
            break;
        default:
            insertAtPosition = answer.length - 2;
    }    

    console.log("Lengte answer: " + answer.length);
    console.log("Positie      : " + insertAtPosition);
    let stringToInsert = " ";
    let arrAnswer = [...answer];
    console.log("arrAnswer   : " + arrAnswer);
    console.log(arrAnswer[insertAtPosition - 1]);
    if (arrAnswer[insertAtPosition - 1] === "|") {
        alert("Splitsen van noot is niet mogelijk");
    }
    else {

        arrAnswer.splice(insertAtPosition, 0, stringToInsert);
        answer  = arrAnswer.join('');
        console.log("Antwoord is nu : " + answer);
        renderABCString(answerConst + answer)
    }
}

function clearNotes() {
    answer = "";
    durationTot = 0;
    measureTot = 0;
    //renderABCString(answerConst)
    load(answerConst);
    //document.getElementById("id_updatebutton").click();
}

function clearOneNote() {
    console.log("lengte van answer: " + answer.length);
    console.log("ABC string: " + answer);
    if (answer.slice(-1) == " "){
        answer = answer.slice(0, answer.length - 1);
        console.log("ABC string: " + answer);
    }
    if (answer.length > 2) {
        console.log("waarde van laatste 2 karakters: " + answer.slice(-2));
        if (answer.slice(-1) != "|"){
            if (answer.slice(-1) == ">") {
                answer = answer.slice(0, answer.length - 1);
            }
            else {
                if (answer.slice(-2) == 32 || answer.slice(-2) == 16)
                {
                    durationTot = durationTot - answer.slice(-2);                      
                    answer = answer.slice(0, answer.length - 3);
                    console.log("ABC string: " + answer);
                    console.log("Totale duur: " + durationTot);
                }
                else {                       
                    durationTot = durationTot - answer.slice(-1);
                    answer = answer.slice(0, answer.length - 2);
                    console.log("ABC string: " + answer);
                    console.log("Totale duur: " + durationTot);
                }
            }
        }
        else {
            if (answer.slice(-2, -1) == " ") {
                if (answer.slice(-4, -2) == 32 || answer.slice(-4, -2) == 16) {
                    console.log("Waarde: " + answer.slice(-4, -2));
                    measureTot = measureTot - 1;
                    durationTot = measureLength - answer.slice(-4, -2);  
                    answer = answer.slice(0, answer.length - 5);  
                    console.log("ABC string: " + answer);
                    console.log("Totale duur: " + durationTot);
                }
                else {
                    console.log("Waarde: " + answer.slice(-3, -1));
                    measureTot = measureTot - 1;
                    durationTot = measureLength - answer.slice(-3, -1);  
                    answer = answer.slice(0, answer.length - 4);  
                    console.log("ABC string: " + answer);
                    console.log("Totale duur: " + durationTot);
                }                  
            }
            else {
                console.log("Waarde: " + answer.slice(-2, -1));
                measureTot = measureTot - 1;
                durationTot = measureLength - answer.slice(-2, -1);
                answer = answer.slice(0, answer.length - 3);
                console.log("ABC string: " + answer);
                console.log("Totale duur: " + durationTot);
            }
        } 
       if (durationTot == 0) {
            if (measureTot == 0) {
                load(answerConst + "|");
                // ABCJS.renderAbc("input", answerConst + "|"); 
                // ABCJS.renderMidi("inputmidi", answerConst + "|"); 
                document.getElementById("id_musictheory_abcstring").value = answerConst + "|"; 
            }
            else {     
                load(answerConst + answer);                   
                // ABCJS.renderAbc("input", answerConst + answer); 
                // ABCJS.renderMidi("inputmidi", answerConst + answer);
                document.getElementById("id_musictheory_abcstring").value = answerConst + answer;  
            } 
        }
        else {
            load(answerConst + answer  + "|");
            // ABCJS.renderAbc("input", answerConst + answer  + "|");
            // ABCJS.renderMidi("inputmidi", answerConst + answer + "|");
            document.getElementById("id_musictheory_abcstring").value = answerConst + answer + "|"; 
        }
    }
    else {
        durationTot = 0;
        answer = answer.slice(0, answer.length - 2);
        renderABCString(answerConst + answer)
    }
    if (measureTot == measures) {
        measureTot = measureTot - 1;
    }
}

function setMeasureCount() {

    var l_measurecount = parseInt(document.getElementById("id_musictheory_measurecount").value);

    console.log("l_measurecount heeft de waarde: " + l_measurecount);
    console.log("measureTot heeft de waarde: " + measureTot);

    if (l_measurecount < measureTot) {
        alert("Meer maten in gebruik dan " + l_measurecount);
        document.getElementById("id_musictheory_measurecount").value = measures;
    }
    else {
        measures = parseInt(document.getElementById("id_musictheory_measurecount").value);
        console.log("Aantal maten: " + measures);
    } 
}

function setMeasuresVisible() {
    let numberofmeasuresvisible = document.getElementById("id_musictheory_numberofmeasuresvisible");
    let kindofmeasuresvisible = document.getElementById("id_musictheory_kindofmeasuresvisible");

    if (document.getElementById("id_musictheory_measuresvisible").value === "1")
    {
        let maxvalue = measures - 1;
//        console.log("De waarde van maxvalue: ", maxvalue);

        let numberofmeasuresvisiblelist = new Array();
        for (let i = 1; i < maxvalue + 1; i++)
        {
            numberofmeasuresvisiblelist[i-1] = i;
//            console.log("De waarde van i: ", i);
//            console.log("De waarde van numberofmeasresvisiblelist: ", numberofmeasuresvisiblelist);
        }
        
        numberofmeasuresvisiblelist.forEach(function(item){
            var option = document.createElement("option");
            option.value = item;
            option.text = item;
            numberofmeasuresvisible.appendChild(option);
         });
         
         let kindofmeasuresvisiblelist = new Array();
         if (measures == 2)
         {
            kindofmeasuresvisiblelist = ["begin","end"];
         }
         else
         {
            kindofmeasuresvisiblelist = ["begin","end","middle"];
         }
        
         kindofmeasuresvisiblelist.forEach(function(item){
            var option = document.createElement("option");
            option.value = item;
            option.text = item;
            kindofmeasuresvisible.appendChild(option);
         });
    }
    else
    {
        if (numberofmeasuresvisible.hasChildNodes()) {            
            while (numberofmeasuresvisible.hasChildNodes()) {  
                numberofmeasuresvisible.removeChild(numberofmeasuresvisible.firstChild);
            }
        }
        if (kindofmeasuresvisible.hasChildNodes()) {            
            while (kindofmeasuresvisible.hasChildNodes()) {  
                kindofmeasuresvisible.removeChild(kindofmeasuresvisible.firstChild);
            }
        }    
    }
}

function setTimeSignature() {

    var l_timesignature = document.getElementById("id_musictheory_timesignature").value;

    console.log("Maatsoort: " + l_timesignature);

    switch (l_timesignature) {
        case "2/2":
            measureLength = 16;
            abcjsL = 32;
            break;  
        case "3/2":
            measureLength = 24;
            abcjsL = 32;
            break;
        case "2/4":
            measureLength = 16;
            abcjsL = 32;
            break;  
        case "3/4":
            measureLength = 24;
            abcjsL = 32;
            break;
        case "4/4":
            measureLength = 32;
            abcjsL = 32;
            break;   
        case "5/4":
            measureLength = 40;
            abcjsL = 32;
            break;    
        case "6/8":
            measureLength = 24;
            abcjsL = 32;
            break;  
        case "7/8":
            measureLength = 28;
            abcjsL = 32;
            break;                         
    }

    answerConst = "M:"+ l_timesignature + "\n" +
    "K: style=rhythm\n" +
    "L:1/" + abcjsL + "\n";
    clearNotes();
}

function chosenTimesignaturecatergory() {
    var l_timesignature_category = document.getElementById("id_musictheory_timesignaturecategory").value;
    var l_timesignature = "";
    var timesignaturelist = new Array();
    var list = document.getElementById("id_musictheory_timesignature");

    console.log("Gekozen maatsoortcategorie: " + l_timesignature_category);

    if (list.hasChildNodes()) {            
        while (list.hasChildNodes()) {  
            list.removeChild(list.firstChild);
        }
    }

    switch (l_timesignature_category) {
        case "n/2":
            timesignaturelist = ["2/2", "3/2"];
            break;
        case "n/4":
            timesignaturelist = ["2/4", "3/4", "4/4", "5/4"];
            break;
        case "n/8":
            timesignaturelist = ["6/8", "7/8"];
            break;
        }

    timesignaturelist.forEach(function(item){
       var option = document.createElement("option");
       option.value = item;
       option.text = item;
       switch (item) {
        case "2/2":
            option.selected = "selected";
            l_timesignature = item;
            measureLength = 32;
            abcjsL = 32;
            break;
        case "4/4":
            option.selected = "selected";
            l_timesignature = item
            measureLength = 32;
            abcjsL = 32;
            break;
        case "6/8":
            option.selected = "selected";
            l_timesignature = item;
            measureLength = 24;
            abcjsL = 32;
            break;
        }
        list.appendChild(option);
    });

    console.log("Maatsoort: " + l_timesignature);
    console.log("Maatlengte: " + measureLength);
    console.log("abcjsL: " + abcjsL); 
   
    answerConst = "M:"+ l_timesignature + "\n" +
    "K: style=rhythm\n" +
    "L:1/" + abcjsL + "\n";
    clearNotes();
}

function renderABCString(abcString){ 
    if (abcString.slice(-1) == "|") {
        load(abcString);
        // ABCJS.renderAbc("input", abcString);
        // ABCJS.renderMidi("inputmidi",
        // abcString,
        // {
        //     inlineControls: {
        //       tempo: true,
        //    },
        // });
        document.getElementById("id_musictheory_abcstring").value = abcString;
    }
    else {                
        load(abcString + "|");
        // ABCJS.renderAbc("input", abcString + "|");
        // ABCJS.renderMidi("inputmidi",
        // abcString + "|",
        // {
        //     inlineControls: {
        //       tempo: true,
        //    },
        // });
        document.getElementById("id_musictheory_abcstring").value = abcString + "|";
    }
    icon = document.getElementById("control_icon");
    message = document.getElementById("oefeningcompleet");
    if (measureTot == measures) {
        icon.src = "/question/type/musictheory/roysmusicquestion/images/vinkje.png";
        message.innerHTML = "De oefening is compleet.<br><br>";
    }
    else {
        icon.src = "/question/type/musictheory/roysmusicquestion/images/kruis.png"; 
        message.innerHTML = "De oefening is nog incompleet.<br><br>";     
    } 
}

function load(abc) {
    console.log("De waarde van abc is: " + abc);
    // First draw the music - this supplies an object that has a lot of information about how to create the synth.
    // NOTE: If you want just the sound without showing the music, use "*" instead of "paper" in the renderAbc call.
    var visualObj = ABCJS.renderAbc("input", abc, {
        scale: "1"})[0];

    // This object is the class that will contain the buffer
    console.log("De waarde van midiBuffer: ", midiBuffer);
    var midiBuffer = [];
    console.log("De waarde van midiBuffer: ", midiBuffer);

    var startAudioButton = document.querySelector(".activate-audio");
    var stopAudioButton = document.querySelector(".stop-audio");
    // var explanationDiv = document.querySelector(".suspend-explanation");
    var statusDiv = document.querySelector(".status");

    startAudioButton.setAttribute("type", "button");
    stopAudioButton.setAttribute("type", "button");

    console.log("De waarde van synth: ", synth);
    console.log("De waarde van supportsAudio: ", ABCJS.synth.supportsAudio());
    startAudioButton.addEventListener("click", function() {
        startAudioButton.setAttribute("style", "display:none;");
        // explanationDiv.setAttribute("style", "opacity: 0;"); Later toevoegen
        // statusDiv.innerHTML = "<div>Testing browser</div>";
        if (ABCJS.synth.supportsAudio()) {
            stopAudioButton.setAttribute("style", "");
            // An audio context is needed - this can be passed in for two reasons:
            // 1) So that you can share this audio context with other elements on your page.
            // 2) So that you can create it during a user interaction so that the browser doesn't block the sound.
            // Setting this is optional - if you don't set an audioContext, then abcjs will create one.
            window.AudioContext = window.AudioContext ||
                window.webkitAudioContext ||
                navigator.mozAudioContext ||
                navigator.msAudioContext;
            var audioContext = new window.AudioContext();
            console.log("AudioContext: ", audioContext);
            audioContext.resume().then(function () {
                // statusDiv.innerHTML += "<div>AudioContext resumed</div>";
                // In theory the AC shouldn't start suspended because it is being initialized in a click handler, but iOS seems to anyway.

                // This does a bare minimum so this object could be created in advance, or whenever convenient.
                midiBuffer = new ABCJS.synth.CreateSynth();
                
                // midiBuffer.init preloads and caches all the notes needed. There may be significant network traffic here.
                console.log("Waarde van millisecondsPerMeasure: " + visualObj.millisecondsPerMeasure());
                console.log("Standaard waarde van abctempo: 4000");
                let abctempo = 4000;
                if (document.getElementById("id_musictheory_abctempo").value !== "") {
                    abctempo = (60 / (document.getElementById("id_musictheory_abctempo").value / document.getElementById("id_musictheory_timesignature").value.substring(0,1))) * 1000;
                    console.log("De waarde van abctempo: " + abctempo + " miliseconds per measurement");
                }
                if (document.getElementById("id_musictheory_countdown").value == 0){
                    drumintro = 0;
                    drumbeat = "";
                }
                else{
                    // Bepalen van de drumbeat en het aantal maten dat het drum intro duurt
                    switch(document.getElementById("id_musictheory_timesignature").value){
                        case "2/2" :
                        case "2/4" :
                            drumbeat = "dd 76 77 60 30";
                            drumintro = 2;
                            break;
                        case "3/2" :
                        case "3/4" :
                            drumbeat = "ddd 76 77 77 60 30 30";
                            drumintro = 1;
                            break;
                        case "4/4" :
                            drumbeat = "dddd 76 77 77 77 60 30 30 30";
                            drumintro = 1;
                            break;
                        case "5/4" :
                            drumbeat = "ddddd 76 77 77 77 77 60 30 30 30 30"; 
                            drumintro = 1;
                            break;
                        case "6/8" :
                            drumbeat = "dd 76 77 60 30";
                            drumintro = 2;
                            break;
                        case "7/8" :
                            drumbeat = "ddddddd 76 77 77 77 77 77 77 60 30 30 30 30 30 30";
                            drumintro = 1;
                            break;
                        default :
                            drumbeat = "dddd 76 77 77 77 60 30 30 30";
                            drumintro = 1;
                            break;
                    }
                }
                return midiBuffer.init({
                    visualObj: visualObj,
                    audioContext: audioContext,
                    // millisecondsPerMeasure: visualObj.millisecondsPerMeasure()
                    millisecondsPerMeasure: abctempo,
                    onEnded: audioContext = [],
                    options: {
                        drum : drumbeat,
                        drumBars : 1,
                        drumIntro : drumintro
                    }
                }).then(function (response) {
                    console.log("Notes loaded: ", response)
                    // statusDiv.innerHTML += "<div>Audio object has been initialized</div>";
                    // console.log(response); // this contains the list of notes that were loaded.
                    // midiBuffer.prime actually builds the output buffer.
                    return midiBuffer.prime();
                }).then(function (response) {
                    // statusDiv.innerHTML += "<div>Audio object has been primed (" + response.duration + " seconds).</div>";
                    // statusDiv.innerHTML += "<div>status = " + response.status + "</div>"
                    // At this point, everything slow has happened. midiBuffer.start will return very quickly and will start playing very quickly without lag.
                    console.log("MidiBuffer: ", midiBuffer);
                    midiBuffer.start();
                    // statusDiv.innerHTML += "<div>Audio started</div>";
                    return Promise.resolve();
                }).catch(function (error) {
                    if (error.status === "NotSupported") {
                        stopAudioButton.setAttribute("style", "display:none;");
                        var audioError = document.querySelector(".audio-error");
                        audioError.setAttribute("style", "");
                    } else
                        console.warn("synth error", error);
                });
            });
        } else {
            var audioError = document.querySelector(".audio-error");
            audioError.setAttribute("style", "");
        }
    });

    stopAudioButton.addEventListener("click", function() {
        startAudioButton.setAttribute("style", "");
        // explanationDiv.setAttribute("style", ""); later toevoegen
        stopAudioButton.setAttribute("style", "display:none;");
        if (midiBuffer) {
            midiBuffer.stop();
        } 
    });
}

function onchangeABCString(){
    var abcString = document.getElementById("id_musictheory_abcstring").value;

    // Aantal maten bepalen op basis van de abcString
    
    if (abcString.slice(-1) != "|") {
        abcString = abcString + " |";
    }

    var countmeasures = (abcString.match(/\|/g)||[]).length;
    document.getElementById("id_musictheory_measurecount").value = countmeasures;
    measures = countmeasures;

    // Maatsoort bepalen op basis van abcString

    timesignature = abcString.substring(abcString.indexOf("M") + 2, abcString.indexOf("M") + 5);
    console.log("De maatsoort is: " + timesignature);
    if (document.getElementById("id_musictheory_timesignature").value != timesignature){                
        // Bepaal of de maatsoort categorie gewijzigd is
        if (document.getElementById("id_musictheory_timesignaturecategory").value != "n" + timesignature.substring(1)){
            document.getElementById("id_musictheory_timesignaturecategory").value = "n" + timesignature.substring(1);
            chosenTimesignaturecatergory();
        }
        document.getElementById("id_musictheory_timesignature").value = timesignature;
    }

    abcString = abcString.replace("K:", "\nK:");
    abcString = abcString.replace("L:", "\nL:")
    abcString = abcString.replace("A", "\nA");

    ABCJS.renderAbc("input", abcString);
    ABCJS.renderMidi("inputmidi",
    abcString,
    {
        inlineControls: {
          tempo: true,
       },
    });
    
    document.getElementById("id_musictheory_abcstring").value = abcString;
}

window.onload = function() {
    if (document.getElementById("id_musictheory_abcstring").value == "") {
        document.getElementById("id_musictheory_timesignaturecategory").value = "n/4";
        chosenTimesignaturecatergory();
        //document.getElementById("id_musictheory_timesignature").value = "4/4";
        renderABCString(answerConst);
    }
    else
    {
        abcString = document.getElementById("id_musictheory_abcstring").value;
        abcString = abcString.replace("K:", "\nK:");
        abcString = abcString.replace("L:", "\nL:")
        abcString = abcString.replace("A", "\nA");

        measureTot = (abcString.match(/\|/g)||[]).length;
        console.log("Waarde van measures: " + measures);
        console.log("Waarde van measureTot: " + measureTot);
        // if (measureTot > measures) {
        //    document.getElementById("measurecount").value = measureTot;
        //    measures = measureTot;
        // }

        answerConst = abcString.substring(0, abcString.indexOf("A"));
        answer = abcString.substring(abcString.indexOf("A"));
        //load(answerConst + answer);
        renderABCString(answerConst + answer);
    }
    if (document.getElementById("id_musictheory_measuresvisible").value === "0")
    {
        let numberofmeasuresvisible = document.getElementById("id_musictheory_numberofmeasuresvisible");
        if (numberofmeasuresvisible.hasChildNodes()) {            
            while (numberofmeasuresvisible.hasChildNodes()) {  
                numberofmeasuresvisible.removeChild(numberofmeasuresvisible.firstChild);
            }
        }
        let kindofmeasuresvisible = document.getElementById("id_musictheory_kindofmeasuresvisible");
        if (kindofmeasuresvisible.hasChildNodes()) {            
            while (kindofmeasuresvisible.hasChildNodes()) {  
                kindofmeasuresvisible.removeChild(kindofmeasuresvisible.firstChild);
            }
        }        
        //document.getElementById("id_musictheory_numberofmeasuresvisible").style.visiblity = "hidden";
        //document.getElementById("id_musictheory_kindofmeasuresvisible").style.visibility = "hidden";
    }
}