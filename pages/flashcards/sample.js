import { useEffect,useState } from 'react'
import Link from "next/link";
import { parseCookies } from "@/helpers/index";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import FlashcardList from "@/components/FlashcardList";

export default function SamplePage() {

  const [flashcards, setFlashcards] = useState(   [
        {term:'delete',definition:'削除する',check1:false,check2:false,check3:false},
        {term:'pull',definition:'引く',check1:false,check2:false,check3:false},
        {term:'main',definition:'主な',check1:false,check2:false,check3:false},
    ])
  
  return (
    <Layout title="Sample Page | Flashcard">
      <h1>Flashcard</h1>
       <FlashcardList flashcards={flashcards} token='sample_token' />
    </Layout>
  );
}

