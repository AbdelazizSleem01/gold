/**
 * MongoDB Seed Script
 * - Creates indexes on `posts` and `shops` collections.
 * - Seeds initial blog posts and gold shops if collections are empty.
 *
 * Run from v0 with: pnpm run seed (or invoked via the SQL/script runner)
 * Uses MONGODB_URI from environment.
 */

import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI

if (!uri) {
  console.error("MONGODB_URI is not set")
  process.exit(1)
}

const dbName = process.env.MONGODB_DB || "gold-prices"

const SEED_POSTS = [
  {
    title: "كيف يتأثر سعر الذهب بأسعار الدولار العالمية؟",
    slug: "gold-vs-dollar-explained",
    excerpt: "تحليل مبسّط للعلاقة العكسية بين سعر الذهب وقوة الدولار الأمريكي وأثر ذلك على الأسواق العربية.",
    content:
      "يرتبط سعر الذهب عالميًا بعلاقة عكسية مع الدولار الأمريكي، فعندما يقوى الدولار يقل الإقبال على الذهب كملاذ آمن، والعكس صحيح.\n\nفي هذا التقرير نستعرض كيف انعكست تحركات الدولار خلال الأشهر الماضية على أسعار الذهب في الدول العربية، وما الذي يجب أن ينتبه له المستثمر العادي قبل الشراء أو البيع.",
    author: "فريق التحرير",
    publishedAt: new Date(),
  },
  {
    title: "أفضل أوقات شراء الذهب في 2025",
    slug: "best-times-to-buy-gold-2025",
    excerpt: "نصائح عملية لاختيار التوقيت الأمثل لشراء الذهب سواءً للاستثمار أو الادخار.",
    content:
      "اختيار توقيت شراء الذهب من أهم العوامل التي تحدد العائد على الاستثمار. في هذا المقال نستعرض المؤشرات الاقتصادية التي يجب متابعتها قبل اتخاذ قرار الشراء.\n\nمن أبرز هذه المؤشرات: قرارات الفيدرالي الأمريكي، التضخم، وأسعار النفط.",
    author: "فريق التحرير",
    publishedAt: new Date(Date.now() - 86400000 * 2),
  },
  {
    title: "الفرق بين عيار 21 وعيار 18 وأيهما أفضل للاستثمار؟",
    slug: "karat-21-vs-18-investment",
    excerpt: "مقارنة شاملة بين عيارات الذهب المختلفة وأي منها يناسبك حسب هدفك من الشراء.",
    content:
      "يتساءل الكثيرون عن الفرق بين عيارات الذهب وأيها أفضل للشراء. عيار 21 هو الأكثر انتشارًا في الدول العربية للمشغولات، بينما يُفضّل عيار 24 للسبائك والعملات الاستثمارية.\n\nنناقش في هذا التقرير الفرق في النقاوة والسعر والاستخدام الأمثل لكل عيار.",
    author: "فريق التحرير",
    publishedAt: new Date(Date.now() - 86400000 * 5),
  },
]

const SEED_SHOPS = [
  { name: "محلات الصاغة الذهبية", city: "القاهرة", country: "egypt", phone: "+20 100 123 4567" },
  { name: "ذهب الإسكندرية", city: "الإسكندرية", country: "egypt", phone: "+20 100 555 8989" },
  { name: "مجوهرات الفيصلية", city: "الرياض", country: "saudi-arabia", phone: "+966 50 123 4567" },
  { name: "الذهب الخالص للمجوهرات", city: "جدة", country: "saudi-arabia", phone: "+966 55 333 2211" },
  { name: "مجوهرات دبي مول", city: "دبي", country: "uae", phone: "+971 50 123 4567" },
  { name: "ذهب الكويت", city: "الكويت", country: "kuwait", phone: "+965 999 12345" },
  { name: "صاغة عمّان", city: "عمّان", country: "jordan", phone: "+962 79 555 1212" },
  { name: "مجوهرات الدوحة", city: "الدوحة", country: "qatar", phone: "+974 5511 2233" },
]

async function run() {
  const client = new MongoClient(uri)
  await client.connect()
  console.log("[v0] Connected to MongoDB")
  const db = client.db(dbName)

  // Indexes
  await db.collection("posts").createIndex({ slug: 1 }, { unique: true })
  await db.collection("posts").createIndex({ publishedAt: -1 })
  await db.collection("shops").createIndex({ country: 1, city: 1 })
  await db.collection("shops").createIndex({ name: "text", city: "text" })
  console.log("[v0] Indexes created")

  // Seed posts if empty
  const postCount = await db.collection("posts").countDocuments()
  if (postCount === 0) {
    await db.collection("posts").insertMany(SEED_POSTS)
    console.log(`[v0] Inserted ${SEED_POSTS.length} posts`)
  } else {
    console.log(`[v0] Posts already exist (${postCount}), skipping seed`)
  }

  // Seed shops if empty
  const shopCount = await db.collection("shops").countDocuments()
  if (shopCount === 0) {
    await db.collection("shops").insertMany(SEED_SHOPS)
    console.log(`[v0] Inserted ${SEED_SHOPS.length} shops`)
  } else {
    console.log(`[v0] Shops already exist (${shopCount}), skipping seed`)
  }

  await client.close()
  console.log("[v0] Done")
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
