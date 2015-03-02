# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150302025404) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "fireworks", force: :cascade do |t|
    t.integer  "fireworker_id"
    t.integer  "fireworkee_id"
    t.boolean  "status"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "likes", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "moment_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "matches", force: :cascade do |t|
    t.integer  "user1_id"
    t.integer  "user2_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "messages", force: :cascade do |t|
    t.integer  "sender_id"
    t.integer  "receiver_id"
    t.text     "message_content"
    t.boolean  "read"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "moments", force: :cascade do |t|
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "content"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "username"
    t.string   "email"
    t.string   "password_digest"
    t.date     "dob"
    t.text     "description"
    t.string   "gender"
    t.string   "location"
    t.text     "profile_pic"
    t.boolean  "is_admin",         default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "provider"
    t.string   "uid"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
  end

end
