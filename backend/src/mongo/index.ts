import mongoose from 'mongoose';

export default {
  connect(mongoUrl: string) {
    return mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
  disconnect() {
    mongoose.disconnect();
  },
};
