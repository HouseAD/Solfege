function addNote(duration, guid) {
    teller = parseInt(document.getElementById("measuretype_"  + guid).value.slice(2, 3));
    noemer = parseInt(document.getElementById("measuretype_"  + guid).value.slice(4, 5));
    switch(noemer){
        case 2:
            abcjsL = teller * 16;
            break;
        case 4:
            abcjsL = teller * 8;
            break;
        case 8:
            abcjsL = teller * 4;
            break;
    }
    
    console.log("---       addNote       ---");
    console.log("Waarde van de teller is   : " + teller);
    console.log("Waarde van de noemer is   : " + noemer);
    console.log("Waarde van de abcjsL is   : " + abcjsL);

    measures = document.getElementById("measurecount_"  + guid).value;
 
    if (document.getElementById("durationtot_"  + guid).value == "") {
        durationTot = 0;
    }    
    else { 
        durationTot = parseInt(document.getElementById("durationtot_"  + guid).value);
    }

    if (document.getElementById("measuretot_"  + guid).value == "") {
        measureTot = 0;
    }
    else {
        measureTot = parseInt(document.getElementById("measuretot_"  + guid).value);
    } 
    
    answer = document.getElementById("answer_"  + guid).value;
    
    if (answer.length < 2) {
        answer = "";
    }

    // Bepaal of het antwoord met een noot of een rust begint.
    if (answer.indexOf('A') == -1) {
        answer = answer.slice(answer.indexOf('z'));
    }
    else {
        answer = answer.slice(answer.indexOf('A'));
    }
    console.log("De waarde van answer is nu : " + answer);
    console.log("De lengte van answer is nu : " + answer.length);
    
    if (measureTot == measures) {
        alert("Maximaal aantal maten gebruikt");
    }
    else {
        if (durationTot + duration > abcjsL) {
            alert("Waarde past niet binnen de maat");
        }
        else {
            console.log("VALUE - answer.slice(-1) : ", answer.slice(-1));
            if(answer.slice(-1) == ">" || answer.slice(-2) == ">-") {
                durationvalue = duration * 2;
                answer = answer + "A" + durationvalue;
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
            
            durationTot = durationTot + duration;

            //  Noten groeperen per hele tel
            
            if(durationTot > 0 && durationTot % 8 == 0) {
                if (answer.slice(-1) != " ") {
                    answer = answer + " ";
                }
            } 

            renderABCString(answer, guid);
 
        }
    }
}

function addRest(duration, guid) {
    teller = parseInt(document.getElementById("measuretype_"  + guid).value.slice(2, 3));
    noemer = parseInt(document.getElementById("measuretype_"  + guid).value.slice(4, 5));
    switch(noemer){
        case 2:
            abcjsL = teller * 16;
            break;
        case 4:
            abcjsL = teller * 8;
            break;
        case 8:
            abcjsL = teller * 4;
            break;
    }

    measures = document.getElementById("measurecount_"  + guid).value;
 
    if (document.getElementById("durationtot_"  + guid).value == "") {
        durationTot = 0;
    }    
    else { 
        durationTot = parseInt(document.getElementById("durationtot_"  + guid).value);
    }

    if (document.getElementById("measuretot_"  + guid).value == "") {
        measureTot = 0;
    }
    else {
        measureTot = parseInt(document.getElementById("measuretot_"  + guid).value);
    } 
    
    answer = document.getElementById("answer_"  + guid).value;

    // Bepaal of het antwoord met een noot of een rust begint.
    if (answer.indexOf('A') == -1) {
        answer = answer.slice(answer.indexOf('z'));
    }
    else {
        answer = answer.slice(answer.indexOf('A'));
    }

    if (measureTot == measures) {
        alert("Maximaal aantal maten gebruikt");
    }
    else {
        if (durationTot + duration > abcjsL) {
            alert("Waarde past niet binnen de maat");
        }
        else {
            answer = answer + "z" + duration;
            durationTot = durationTot + duration;
    
            renderABCString(answer, guid);
        }
    }
}

function addPoint(guid) {
    console.log("---       addPoint       ---");
    console.log("INPUT - guid       : ", guid);

    teller = parseInt(document.getElementById("measuretype_"  + guid).value.slice(2, 3));
    noemer = parseInt(document.getElementById("measuretype_"  + guid).value.slice(4, 5));
    console.log("VALUE - teller      : ", teller);
    console.log("VALUE - noemer      : ", noemer);
 
    switch(noemer){
        case 2:
            abcjsL = teller * 16;
            break;
        case 4:
            abcjsL = teller * 8;
            break;
        case 8:
            abcjsL = teller * 4;
            break;
    }
    console.log("VALUE - abcjsL      : ", abcjsL);

    measures = document.getElementById("measurecount_"  + guid).value;
    console.log("VALUE - measures    : ", measures);
 
    if (document.getElementById("durationtot_"  + guid).value == "") {
        durationTot = 0;
    }    
    else { 
        durationTot = parseInt(document.getElementById("durationtot_"  + guid).value);
    }
    console.log("VALUE - durationTot : ", durationTot);

    if (document.getElementById("measuretot_"  + guid).value == "") {
        measureTot = 0;
    }
    else {
        measureTot = parseInt(document.getElementById("measuretot_"  + guid).value);
    } 
    console.log("VALUE - measureTot  : ", measureTot);
    
    answer = document.getElementById("answer_"  + guid).value;
    console.log("VALUE - answer - 1  : ", answer);

    // Bepaal of het antwoord met een noot of een rust begint.
    if (answer.indexOf('A') == -1) {
        answer = answer.slice(answer.indexOf('z'));
    }
    else {
        answer = answer.slice(answer.indexOf('A'));
    }
    if (answer.slice(-1) == "|") {
        answer = answer.slice(0, answer.length - 2);
    }
    console.log("VALUE - answer - 2  : ", answer);
    
    if (answer.slice(-3) == 32 || answer.slice(-3) == 16) {
        duration = answer.slice(-3)
    }
    else {
        duration = answer.slice(-2)
    }   
    console.log("VALUE - duration    : ", duration);

    if (measureTot == measures) {
        alert("Maximaal aantal maten gebruikt");
    }
    else { 
        if (answer.slice(-6, -5) == ">" ||answer.slice(-5, -4) == ">" || answer.slice(-4, -3) == ">" || answer.slice(-3, -2) == ">") {
            duration = duration / 2;
            console.log("VALUE - duration - 2 : ", duration);
        }
        if (parseInt(durationTot) + (parseInt(duration) / 2) > parseInt(abcjsL)) {
            alert("Waarde past niet binnen de maat");
        }
        else {
            answer = answer + ">";
            durationTot = durationTot + (duration / 2);
            console.log("NEW   - answer      : ", answer);
            console.log("NEW   - durationTot : ", durationTot);   
            renderABCString(answer, guid);
        }
    }
}

function addTies(guid) {
    teller = parseInt(document.getElementById("measuretype_"  + guid).value.slice(2, 3));
    noemer = parseInt(document.getElementById("measuretype_"  + guid).value.slice(4, 5));
    switch(noemer){
        case 2:
            abcjsL = teller * 16;
            break;
        case 4:
            abcjsL = teller * 8;
            break;
        case 8:
            abcjsL = teller * 4;
            break;
    }
    measures = document.getElementById("measurecount_"  + guid).value;
 
    if (document.getElementById("durationtot_"  + guid).value == "") {
        durationTot = 0;
    }    
    else { 
        durationTot = parseInt(document.getElementById("durationtot_"  + guid).value);
    }

    if (document.getElementById("measuretot_"  + guid).value == "") {
        measureTot = 0;
    }
    else {
        measureTot = parseInt(document.getElementById("measuretot_"  + guid).value);
    } 
    
    answer = document.getElementById("answer_"  + guid).value;

        // Bepaal of het antwoord met een noot of een rust begint.
        if (answer.indexOf('A') == -1) {
            answer = answer.slice(answer.indexOf('z'));
        }
        else {
            answer = answer.slice(answer.indexOf('A'));
        }

    answer = answer + "-";

    renderABCString(answer, guid);
}

function cutNote(guid) {
    answer = document.getElementById("answer_"  + guid).value;

    // Bepaal of het antwoord met een noot of een rust begint.
    if (answer.indexOf('A') === -1) {
        answer = answer.slice(answer.indexOf('z'));
    }
    else {
        answer = answer.slice(answer.indexOf('A'));
    }

    console.log("*** Functie Knip Noot ***")
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
        renderABCString(answer, guid)
    }
}


function clearNotes(guid) {
    answerConst = document.getElementById("measuretype_"  + guid).value + "\n" + 
                  "K: style=rhythm\n" +
                  "L:1/32\n";
    answer = "";
    durationTot = 0;
    measureTot = 0;
    ABCJS.renderAbc("input_"  + guid, answerConst + "|");
    // ABCJS.renderMidi("inputmidi_"  + guid, answerConst + "|");
    document.getElementById("durationtot_"  + guid).value = durationTot;
    document.getElementById("measuretot_"  + guid).value = measureTot;
    document.getElementById("answer_"  + guid).value = answerConst + answer;
    if (document.getElementById("result_"  + guid).value != "") {
        document.getElementById("result_"  + guid).value = "";
    }
}

function clearOneNote(guid) {
    teller = parseInt(document.getElementById("measuretype_"  + guid).value.slice(2, 3));
    noemer = parseInt(document.getElementById("measuretype_"  + guid).value.slice(4, 5));
    switch(noemer){
        case 2:
            abcjsL = teller * 16;
            break;
        case 4:
            abcjsL = teller * 8;
            break;
        case 8:
            abcjsL = teller * 4;
            break;
    }

    console.log("---     clearOneNote    ---");
    console.log("Waarde van guid is        : " + guid);
    console.log("Waarde van de teller is   : " + teller);
    console.log("Waarde van de noemer is   : " + noemer);
    console.log("Waarde van de abcjsL is   : " + abcjsL);

    measures = document.getElementById("measurecount_"  + guid).value;

    console.log("Waarde van measures is    : " + measures);
 
    if (document.getElementById("durationtot_"  + guid).value == "") {
        durationTot = 0;
    }    
    else { 
        durationTot = parseInt(document.getElementById("durationtot_"  + guid).value);
    }

    console.log("Waarde van durationTot is : " + durationTot);

    if (document.getElementById("measuretot_"  + guid).value == "") {
        measureTot = 0;
    }
    else {
        measureTot = parseInt(document.getElementById("measuretot_"  + guid).value);
    } 
    
    console.log("Waarde van measureTot is  :" + measureTot);

    answer = document.getElementById("answer_"  + guid).value;

    // Bepaal of het antwoord met een noot of een rust begint.
    if (answer.indexOf('A') == -1) {
        answer = answer.slice(answer.indexOf('z'));
    }
    else {
        answer = answer.slice(answer.indexOf('A'));
    }

    console.log("De lengte van answer is   : " + answer.length);
    console.log("De waarde van answer is   : " + answer);

    if (answer.slice(-1) == " "){
        answer = answer.slice(0, answer.length - 1);
        console.log("De lengte van answer is   : " + answer.length);
        console.log("De waarde van answer is   : " + answer);
    }

    if (answer.length > 2) {
        console.log("Waarde laatste 2 karakters: " + answer.slice(-2));

        if (answer.slice(-1) != "|"){
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
        else {
            if (answer.slice(-2, -1) == " ") {
                if (answer.slice(-4, -2) == 32 || answer.slice(-4, -2) == 16) {
                    console.log("Waarde: " + answer.slice(-4, -2));
                    measureTot = measureTot - 1;
                    durationTot = abcjsL - answer.slice(-4, -2);  
                    answer = answer.slice(0, answer.length - 5);  
                    console.log("ABC string: " + answer);
                    console.log("Totale duur: " + durationTot);
                }
                else {
                    console.log("Waarde: " + answer.slice(-3, -1));
                    measureTot = measureTot - 1;
                    durationTot = abcjsL - answer.slice(-3, -1);  
                    answer = answer.slice(0, answer.length - 4);  
                    console.log("ABC string: " + answer);
                    console.log("Totale duur: " + durationTot);
                }                  
            }
            else {
                console.log("Waarde: " + answer.slice(-2, -1));
                measureTot = measureTot - 1;
                durationTot = abcjsL - answer.slice(-2, -1);
                answer = answer.slice(0, answer.length - 3);
                console.log("ABC string: " + answer);
                console.log("Totale duur: " + durationTot);
            }
        } 
        renderABCString(answer, guid);
    }
    else {
        console.log("answer.length <= 2");
        durationTot = 0;
        answer = answer.slice(0, answer.length - 2);
  
        renderABCString(answer, guid);
    }
    if (document.getElementById("result_"  + guid).value != "") {
        document.getElementById("result_"  + guid).value = "";
    }
}

function checkAnswer(abcAnswer, guid) {
    console.log("================");
    console.log("ANTWOORDCONTROLE");
    console.log("================");
    console.log("De waarde van guid is         : " + guid);   
    
    rightanswer =  document.getElementById("abcstring_"  + guid).value;
    ratingType = document.getElementById("ratingtype_" + guid).value;

    let score = 0;
    let result = 0;
    let arrABCAnswer = "";
    let arrRightAnswer = "";

    console.log("De waarde van rightanswer1 is : " + rightanswer);

    if (rightanswer.indexOf('A') == -1) {
        rightanswer =  rightanswer.slice(rightanswer.indexOf('z'));
    }
    else {
        rightanswer =  rightanswer.slice(rightanswer.indexOf('A'));
    }

    console.log("De waarde van rightanswer2 is : " + rightanswer);
    console.log("De waarde van abcAnswer is    : " + abcAnswer);
    console.log("De waarde van measureTot is   : " + measureTot);
    console.log("De waarde van measures is     : " + measures);  

    // Aanpassen aan meerdere antwoordmogelijkheden
    
    // Hele noten
    if (rightanswer.search('A32') != -1) {
        while (abcAnswer.search("A16 -A16") != -1) {
            abcAnswer = abcAnswer.replace("A16 -A16", "A32"); 
        }
    }
    // Halve noten
    if (rightanswer.search('A16') != -1) {
        while (abcAnswer.search("A8 -A8") != -1) {
            abcAnswer = abcAnswer.replace("A8 -A8", "A16"); 
        }
        while (abcAnswer.search("A4-A4 -A4-A4") != -1) {
            abcAnswer = abcAnswer.replace("A4-A4 -A4-A4", "A16"); 
        }
    }
    // Kwart noten
    if (rightanswer.search('A8') != -1) {
        while (abcAnswer.search("A4-A4") != -1) {
            abcAnswer = abcAnswer.replace("A4-A4", "A8"); 
        }
    }
    // Kwart noot overbindingdsboog achtste noot
    if (rightanswer.search('A8 -A4') != -1) {
        while (abcAnswer.search('A8 >') != -1) {
            abcAnswer = abcAnswer.replace('A8 >', 'A8 -');
        }
    }
    // Kwart noot overbindingdsboog kwart noot
    if (rightanswer.search('A16') != -1) {
        while (abcAnswer.search('A8 -A8') != -1) {
            abcAnswer = abcAnswer.replace('A8 -A8', 'A16');
        }
    }
    // Kwart noot met punt
    if (rightanswer.search('A8 >') != -1) {
        if (rightanswer.search('A8 >A16>16')) {
            while (abcAnswer.search('A8 -A4A8-A4 A8') != -1) {
                abcAnswer = abcAnswer.replace('A8 -A4A8-A4 A8', 'A8 >A16>A16');
            }
        }
    }   
    //  zestiende noot overbindingdsboog zestiende noot
    if (rightanswer.search('A4') != -1) {
        while (abcAnswer.search('A2-A2') != -1) {
            abcAnswer = abcAnswer.replace('A2-A2', 'A4');
        }
    }

    console.log("De waarde van abcAnswer is na aanpassing : " + abcAnswer);

    // De score bepalen
    console.log("Waarde van ratingtype is: " + ratingType);

    switch(ratingType) {
        case "ratingpernote":
            arrABCAnswer = [...abcAnswer];
            arrRightAnswer = [...rightanswer];
            for (i = 0; i < abcAnswer.length; i++) {
                if (arrABCAnswer[i] == arrRightAnswer[i]) {
                    score = score + 1;
                    console.log("De score is : " + score);
                } 
            }
            result = (score / rightanswer.length) * 100;
            break;
        case "ratingpermeasure":
            measures = document.getElementById("measurecount_"  + guid).value;
            console.log("Aantal maten voor deze vraag is: " + measures);
            arrABCAnswer = abcAnswer.split("|");
            arrRightAnswer = rightanswer.split("|");
            for (i= 0; i < measures; i++) {
                console.log("Gegeven antwoord  : De waarde van maat " + i + "is: " + arrABCAnswer[i]);
                console.log("Gevraagde antwoord: De waarde van maat " + i + "is: " + arrRightAnswer[i]);    
                if (arrABCAnswer[i] == arrRightAnswer[i]) {
                    score = score + (100/measures);
                    console.log("De score is : " + score);                    
                } 
            }
            result = score;
            break;
        case "ratingperexercise":
            if (abcAnswer == rightanswer) {
                result = 100;
            }
            else {
                result = 0;
            }
    }

    result = parseFloat(result).toFixed(2);
    console.log("Het resultaat is  : " + result);

    document.getElementById("result_" + guid).value = result + "%";
    document.getElementById("result_"  + guid).style.fontWeight = "bold";  

    if (result == parseFloat(100).toFixed(2)) {
        document.getElementById("result_"  + guid).style.color = "green";
    }
    else if (result >= parseFloat(55).toFixed(2) && result < parseFloat(100).toFixed(2)) {
        document.getElementById("result_"  + guid).style.color = "orange";
    }
    else {
        document.getElementById("result_"  + guid).style.color = "red";
    }

    console.log("De lengte van rightanswer is  : " + rightanswer.length);
    console.log("De lengte van abcAnswer is    : " + abcAnswer.length);
}

function load(abc, guid) {
    console.log("De waarde van abc is: " + abc);
    // First draw the music - this supplies an object that has a lot of information about how to create the synth.
    // NOTE: If you want just the sound without showing the music, use "*" instead of "paper" in the renderAbc call.
    var visualObj = ABCJS.renderAbc("input_"  + guid, abc, {
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
                return midiBuffer.init({
                    visualObj: visualObj,
                    audioContext: audioContext,
                    // millisecondsPerMeasure: visualObj.millisecondsPerMeasure()
                    millisecondsPerMeasure: abctempo,
                    options: {
                        onEnded: audioContext = []
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

function renderABCString(answer, guid){
    console.log("--- function: renderABCString ---");
    console.log("INPUT - answer : " + answer);
    console.log("INPUT - guid : " + guid);

    // Stel het constante deel van de ABCString samen
    answerConst = document.getElementById("measuretype_"  + guid).value + "\n" + 
                  "K: style=rhythm\n" +
                  "L:1/32\n";

    // Bepaal of het antwoord met een noot of een rust begint.
    if (answer.indexOf('A') == -1) {
        answer = answer.slice(answer.indexOf('z'));
    }
    else {
        answer = answer.slice(answer.indexOf('A'));
    }

    console.log("VALUE - durationTot : " + durationTot);
    console.log("VALUE - answer.length : " + answer.length);

    if(durationTot == 0 && answer.length > 0) {
        ABCJS.renderAbc("input_"  + guid, answerConst + answer);
        ABCJS.renderMidi("inputmidi_"  + guid, answerConst + answer);
        document.getElementById("durationtot_"  + guid).value = durationTot;
        document.getElementById("measuretot_"  + guid).value = measureTot;
        document.getElementById("answer_"  + guid).value = answerConst + answer;
    }    
    else { 
        console.log("VALUE - abcjsL : " + abcjsL);

        if (durationTot == abcjsL) {
            measureTot = measureTot + 1;
            answer = answer + "|";
            durationTot = 0;
            ABCJS.renderAbc("input_"  + guid, answerConst + answer);
            ABCJS.renderMidi("inputmidi_"  + guid, answerConst + answer);
            document.getElementById("durationtot_"  + guid).value = durationTot;
            document.getElementById("measuretot_"  + guid).value = measureTot;
            document.getElementById("answer_"  + guid).value = answerConst + answer;
            if (measureTot == measures) {
                checkAnswer(answer, guid);
            } 
        }
        else {
            ABCJS.renderAbc("input_"  + guid, answerConst + answer  + "|");
            ABCJS.renderMidi("inputmidi_"  + guid, answerConst + answer + "|");
            document.getElementById("durationtot_"  + guid).value = durationTot;
            document.getElementById("measuretot_"  + guid).value = measureTot;
            document.getElementById("answer_"  + guid).value = answerConst + answer;
            if (measureTot == measures) {
                checkAnswer(answer + "|", guid);
            } 
        }
    }
} 

window.onload = function() {
    // console.log("window.onload functie");
    // let supportsAudio = ABCJS.synth.supportsAudio();
    // console.log("De waarde van sukpportsAudio is: "  + supportsAudio);
    // if (ABCJS.synth.supportsAudio()) {
    //     console.log("komt in de if");
    //     synthControl = new ABCJS.synth.SynthController();
    //     synthControl.load("#audio_" + guid, cursorControl, {displayLoop: true, displayRestart: true, displayPlay: true, displayProgress: true, displayWarp: true});
    // } else {
    //     console.log("komt in de else");
    //     document.querySelector("#audio").innerHTML = "<div class='audio-error'>Audio is not supported in this browser.</div>";
    // }
    // setTune(false);
} 