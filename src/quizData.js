export const quizData = {
	quiz: {
		name: 'Test Quiz',
		succesmessage:
			'Herzlichen Glückwunsch! Du hast die Quizfragen richtig beantwortet und Punkte gesammelt.',
		quizfrage: [
			{
				id: 1,
				require: 0,
				name: 'Waldspielplatz',
				lat: 51.562920286505786,
				lon: 6.7823981345155016,
				next: 2,
				frage: {
					frageHTML:
						'Was darf man beim spielen auf dem Spielplatz nicht tragen?',
					antwort1: {
						id: 1,
						text: 'Offene Schuhe wie Sandalen oder Flip-Flops.',
					},
					antwort2: {
						id: 2,
						text: 'Einen Anzug oder formelle Kleidung.',
					},
					antwort3: {
						id: 3,
						text: 'Einen Fahrradhelm.',
					},
					tipp: {
						id: 1,
						text: '<img src="/quiz/1.jpg" alt="Fahrradhelm" style="width:100%;height:auto;" />',
					},
					loesung: {
						id: 3,
						text: '<p>Auf dem Waldspielplatz sollte man keinen Fahrradhelm tragen</p><p> Gehe weiter auf den Spielpatz um die nächste Frage zu finden.</p>',
					},
				},
			},
			{
				id: 2,
				require: 1,
				name: 'Spielgeräte',
				lat: 51.56413411641966,
				lon: 6.782146969224898,
				next: 3,
				frage: {
					frageHTML: 'Welches Spielgerät steht auf dem Hügel?',
					antwort1: {
						id: 1,
						text: 'Eine Seilbahn.',
					},
					antwort2: {
						id: 2,
						text: 'Eine Rutsche.',
					},
					antwort3: {
						id: 3,
						text: 'Eine Schaukel.',
					},
					tipp: {
						id: 1,
						text: '<p>Siehe am Ende des Spielplatzes nach oben auf den Hügel.</p><img src="/quiz/2.jpg" alt="Rutsche" style="width:100%;height:auto;" />',
					},
					loesung: {
						id: 2,
						text: '<p>Eine Rutsche.</p><p> Gehe durch den Wald zum nächsten Fragepunkt.</p><img src="/quiz/3.jpg" alt="Weg zum nächsten Punkt" style="width:100%;height:auto;" />',
					},
				},
			},
			{
				id: 3,
				require: 2,
				name: 'Sportplatz',
				lat: 51.565389185891526,
				lon: 6.781696635426765,
				next: 4,
				frage: {
					frageHTML:
						'Welcher Sport wird auf dem angrenzenden Platz häufig ausgeübt?',
					antwort1: {
						id: 1,
						text: 'Tennis.',
					},
					antwort2: {
						id: 2,
						text: 'Segeln.',
					},
					antwort3: {
						id: 3,
						text: 'Basketball.',
					},
					tipp: {
						id: 1,
						text: 'Boris Becker und Steffi Graf sind bekannt für diesen Sport.',
					},
					loesung: {
						id: 1,
						text: '<p>Auf dem angrenzenden Platz wird häufig Tennis gespielt. </p><p>Folge dem Weg in Richtung Straße und biege bei nächster Möglichkeit nach rechts zum nächsten Punkt ab.</p>',
					},
				},
			},
			{
				id: 4,
				require: 3,
				name: 'Fußballplatz',
				lat: 51.56669522531969,
				lon: 6.7786389210534645,
				next: null,
				frage: {
					frageHTML: 'Welche Farbe hat der Kunstrasen auf dem Fußballplatz?',
					antwort1: {
						id: 1,
						text: 'Blau.',
					},
					antwort2: {
						id: 2,
						text: 'Grün.',
					},
					antwort3: {
						id: 3,
						text: 'Rot.',
					},
					tipp: {
						id: 1,
						text: '<p>Siehe dir den Platz genau an.</p><img src="/quiz/4.jpg" alt="Fußballplatz" style="width:100%;height:auto;" />',
					},
					loesung: {
						id: 2,
						text: '<p>Der Kunstrasen auf dem Fußballplatz ist grün.</p><p><strong>Herzlichen Glückwunsch! Du hast alle Quizfragen richtig beantwortet.</strong></p>',
					},
				},
			},
		],
	},
};

export default quizData;
