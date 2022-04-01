import mongoose from "mongoose";
import Book from "./Book";

const { Schema } = mongoose;

const ChapterSchema = new Schema({
  // schema 內容
  bookId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  isFree: {
    type: Boolean,
    required: true,
    default: false,
  },
  githubFilePath: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
    required: true,
  },
  htmlContent: {
    type: String,
    default: "",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  seoTitle: String,
  seoDescription: String,
});

class ChapterClass {
  // 需要的函式
  static async getBySlug({ bookSlug, chapterSlug }) {
    const book = await Book.getBySlug({ slug: bookSlug });
    if (!book) {
      throw new Error(`${bookSlug} 書本不存在`);
    }

    const chapter = await this.findOne({ bookId: book._id, slug: chapterSlug });

    if (!chapter) {
      throw new Error(`${chapterSlug} 章節不存在`);
    }

    const chapterObject = chapter.toObject();
    chapterObject.book = book;

    return chapterObject;
  }
}

ChapterSchema.index({ bookId: 1, slug: 1 }, { unique: true });
ChapterSchema.index({ bookId: 1, githubFilePath: 1 }, { unique: true });

ChapterSchema.loadClass(ChapterClass);

export default mongoose.models.Chapter ||
  mongoose.model("Chapter", ChapterSchema);
