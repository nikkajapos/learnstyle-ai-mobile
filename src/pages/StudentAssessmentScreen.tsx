import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native';

const questions: string[] = [
  'When learning something new, you prefer:',
  'If someone explains a concept, you understand best when:',
  'When studying, you usually:',
  'If you are learning how to use a new app, you prefer:',
  'After a test, you prefer feedback:',
  'When attending a class, you prefer teachers who:',
  'When remembering information, you:',
  'When learning a skill (e.g., coding), you prefer:',
  'When choosing between options, you:',
  'When working on a project, you:',
  'When trying to remember directions to a place, you prefer:',
  'When learning a complex process, you prefer:',
  'When working in a group, you learn most when:',
  'If you need to understand a new concept, you prefer:',
  'When preparing for an exam, you usually:',
  'When learning about how a machine or system works, you prefer:',
  'When attending a workshop or training, you benefit most from:',
  'When learning something difficult, you prefer to:'
];

const options: string[][] = [
  ['Diagrams, charts, or visuals', 'Listening to explanations', 'Reading written materials', 'Trying it yourself'],
  ['They use graphs or illustrations', 'They talk it through step-by-step', 'They give written notes', 'They show real-life examples'],
  ['Use mind maps or diagrams', 'Discuss topics with others', 'Take detailed notes', 'Practice or simulate the task'],
  ['Screenshots or visual guides', 'Someone explaining it verbally', 'Written instructions/manual', 'Exploring and trying it yourself'],
  ['Graphs or charts of your performance', 'A discussion with your teacher', 'Written comments', 'Practical examples of mistakes'],
  ['Use diagrams and visuals', 'Encourage discussions', 'Provide handouts and readings', 'Include activities or demonstrations'],
  ['Visualize it', 'Recall what was said', 'Remember written words', 'Recall what you did'],
  ['Flowcharts or system diagrams', 'Listening to explanations/tutorials', 'Reading documentation', 'Coding and experimenting'],
  ['Compare visual charts', 'Ask others for advice', 'Read detailed descriptions', 'Try each option'],
  ['Design layouts/visuals', 'Talk through ideas', 'Write plans or outlines', 'Build prototypes'],
  ['Looking at a map or visual guide', 'Listening to someone explain the route', 'Reading written directions', 'Traveling the route yourself to remember it'],
  ['A flowchart or diagram showing the steps', 'Someone explaining the process verbally', 'Written instructions listing each step', 'Performing the steps yourself while learning'],
  ['Ideas are illustrated with diagrams or visuals', 'Everyone discusses and talks through ideas', 'Notes or documents are shared and reviewed', 'The group builds or demonstrates something'],
  ['Seeing graphs, models, or visual representations', 'Listening to a lecture or explanation', 'Reading textbooks or articles', 'Observing or participating in demonstrations'],
  ['Review charts, diagrams, and visual summaries', 'Talk through topics with classmates', 'Rewrite notes or read materials repeatedly', 'Practice solving problems or doing exercises'],
  ['Studying diagrams or schematics', 'Listening to an explanation about how it operates', 'Reading manuals or documentation', 'Taking it apart or experimenting with it'],
  ['Visual slides, diagrams, or demonstrations', 'Listening to explanations and discussions', 'Written materials or guides', 'Hands-on activities or practice'],
  ['Visualize the information through diagrams', 'Hear examples and explanations', 'Write notes or read explanations', 'Try different approaches and learn by doing']
];

export default function StudentAssessmentScreen() {
  const router = useRouter();

  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const [name, setName] = useState('');
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const loadName = async () => {
      const profile = await AsyncStorage.getItem('studentProfile');
      if (profile) {
        const parsed = JSON.parse(profile);
        if (parsed.name) setName(parsed.name);
      }
    };
    loadName();
  }, []);

  const selectAnswer = (oIndex: number) => {
    const updated = [...answers];
    updated[currentQuestion] = ['A', 'B', 'C', 'D'][oIndex];
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAnswers(updated);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert('Please enter your name first.');
      return;
    }

    if (answers.some((a) => !a)) {
      alert('Please answer every question to get an accurate result.');
      return;
    }

    setIsSubmitting(true);

    const score = {
      Visual: 0,
      Auditory: 0,
      ReadWrite: 0,
      Kinesthetic: 0,
    };

    answers.forEach((ans) => {
      if (ans === 'A') score.Visual++;
      if (ans === 'B') score.Auditory++;
      if (ans === 'C') score.ReadWrite++;
      if (ans === 'D') score.Kinesthetic++;
    });

    const max = Math.max(...Object.values(score));
    const top = Object.keys(score).filter((k) => score[k as keyof typeof score] === max);
    const learningStyle = top.join(' & ');

    await AsyncStorage.setItem('studentProfile', JSON.stringify({ name, learningStyle, score }));

    setResult(`Your style is ${learningStyle}`);
    setHasSubmitted(true);
    setIsSubmitting(false);

    setTimeout(() => {
      router.replace('/StudentDashboard');
    }, 1200);
  };

  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.heroCard}>
          <Text style={styles.title}>Learning Style Assessment</Text>
          <Text style={styles.subtitle}>Answer 18 questions one-by-one to uncover your best learning mode.</Text>
          <View style={styles.progressRow}>
            <Text style={styles.progressText}>Question {currentQuestion + 1} of {questions.length}</Text>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
          <View style={styles.progressBarOuter}>
            <View style={[styles.progressBarInner, { width: `${progress}%` }]} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.questionText}>{currentQuestion + 1}. {questions[currentQuestion]}</Text>

          {options[currentQuestion].map((opt, j) => {
            const selected = answers[currentQuestion] === ['A', 'B', 'C', 'D'][j];
            return (
              <TouchableOpacity
                key={j}
                style={[styles.option, selected && styles.optionSelected]}
                onPress={() => selectAnswer(j)}
                activeOpacity={0.8}
              >
                <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{opt}</Text>
                {selected ? <Text style={styles.optionCheck}>✓</Text> : null}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.navRow}>
          <TouchableOpacity
            style={[styles.navBtn, currentQuestion === 0 && styles.navBtnDisabled]}
            onPress={previousQuestion}
            disabled={currentQuestion === 0}
          >
            <Text style={[styles.navText, currentQuestion === 0 && styles.navTextDisabled]}>Previous</Text>
          </TouchableOpacity>

          {currentQuestion < questions.length - 1 ? (
            <TouchableOpacity style={styles.navBtn} onPress={nextQuestion}>
              <Text style={styles.navText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.navBtn, styles.submitBtn]} onPress={handleSubmit}>
              <Text style={[styles.navText, styles.submitText]}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>

        {hasSubmitted && <Text style={styles.resultText}>{result}</Text>}

        <TouchableOpacity style={styles.backBtn} onPress={() => router.replace('/StudentDashboard')}>
          <Text style={styles.backBtnText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7ff' },
  contentContainer: { padding: 20, paddingBottom: 60 },
  heroCard: {
    backgroundColor: '#eef2ff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  title: { fontSize: 24, fontWeight: '900', color: '#1e3a8a' },
  subtitle: { marginTop: 5, color: '#475569', fontSize: 14 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  progressText: { color: '#64748b', fontWeight: '700' },
  progressBarOuter: { width: '100%', height: 8, backgroundColor: '#e2e8f0', borderRadius: 4, marginTop: 6, overflow: 'hidden' },
  progressBarInner: { height: '100%', backgroundColor: '#22c55e' },
  card: { marginVertical: 10, padding: 18, backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 3 },
  questionText: { fontSize: 18, fontWeight: '800', color: '#0f172a', marginBottom: 12 },
  option: { minHeight: 56, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#cbd5e1', marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff' },
  optionSelected: { backgroundColor: '#dbeafe', borderColor: '#1d4ed8' },
  optionText: { color: '#1f2937', fontWeight: '600', width: '90%' },
  optionTextSelected: { color: '#1d4ed8' },
  optionCheck: { fontSize: 18, color: '#1d4ed8', fontWeight: '900' },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 },
  navBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, backgroundColor: '#e2e8f0', marginHorizontal: 4, alignItems: 'center' },
  navBtnDisabled: { opacity: 0.4 },
  navText: { fontWeight: '800', color: '#1e3a8a' },
  navTextDisabled: { fontWeight: '800', color: '#94a3b8' },
  submitBtn: { backgroundColor: '#1e40af' },
  submitText: { color: '#fff' },
  safe: { flex: 1, backgroundColor: '#f4f7ff' },
  backBtn: { marginTop: 10, padding: 14, borderRadius: 12, alignItems: 'center', backgroundColor: '#e2e8f0' },
  backBtnText: { color: '#1f2937', fontWeight: '800' },
  resultText: { marginTop: 10, color: '#0f766e', fontWeight: '800', textAlign: 'center' },
});