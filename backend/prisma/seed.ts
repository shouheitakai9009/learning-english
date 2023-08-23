import { PartOfSpeech, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  /**
   * Seed of the PartOfSpeech
   */
  const partOfSpeeches: PartOfSpeech[] = [
    { id: 'article', name: '冠詞' },
    { id: 'noun', name: '名詞' },
    { id: 'pronoun', name: '代名詞' },
    { id: 'verb', name: '動詞' },
    { id: 'adjective', name: '形容詞' },
    { id: 'adverb', name: '副詞' },
    { id: 'preposition', name: '前置詞' },
    { id: 'conjunction', name: '接続詞' },
    { id: 'interjection', name: '間投詞' },
    { id: 'auxiliaryverb', name: '助動詞' },
    { id: 'unknown', name: '不明' },
  ];
  partOfSpeeches.forEach(async (partOfSpeech) => {
    const output = await prisma.partOfSpeech.upsert({
      where: { id: partOfSpeech.id },
      update: {},
      create: { id: partOfSpeech.id, name: partOfSpeech.name },
    });
    console.log(output);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
