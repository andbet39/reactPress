import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';

const Schema = mongoose.Schema;

// create a schema
const postinfoSchema = new Schema({
  post_id: Number,
  view : Number,
  slug : String
});

postinfoSchema.plugin(findOrCreate);

// the schema is useless so far
// we need to create a model using it
const PostInfo = mongoose.model('PostInfo', postinfoSchema);

// make this available to our users in our Node applications
export default PostInfo;
