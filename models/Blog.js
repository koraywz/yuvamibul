import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    blogNo: {
        type: Number,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    olusturan: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Bu otomatik olarak createdAt ve updatedAt alanlarını ekler
});

// Blog kaydedilmeden önce en büyük blog_no'yu bulup bir artırır. Böylece blog_no otomatik artar.
blogSchema.pre('save', async function(next) {
    try {
        if (!this.blogNo) {
            const lastBlog = await this.constructor.findOne().sort({ blogNo: -1 });
            this.blogNo = lastBlog ? lastBlog.blogNo + 1 : 1;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog; 