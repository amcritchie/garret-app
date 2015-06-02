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

ActiveRecord::Schema.define(version: 20150602220421) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "departments", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "evaluation_applications", force: true do |t|
    t.integer  "evaluation_id"
    t.integer  "user_id"
    t.string   "status"
    t.text     "score"
    t.datetime "accepted_at"
    t.datetime "completed_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "arrive_time"
    t.string   "depart_time"
    t.boolean  "check_all_items_billed"
    t.string   "check_num"
    t.string   "table_num"
    t.string   "check_amount"
    t.boolean  "res_valid"
    t.string   "res_gender"
    t.string   "res_height"
    t.string   "res_hair"
    t.text     "res_other"
    t.boolean  "bar_valid"
    t.string   "bar_gender"
    t.string   "bar_height"
    t.string   "bar_hair"
    t.text     "bar_other"
    t.boolean  "host1_valid"
    t.string   "host1_gender"
    t.string   "host1_height"
    t.string   "host1_hair"
    t.text     "host1_other"
    t.boolean  "host2_valid"
    t.string   "host2_gender"
    t.string   "host2_height"
    t.string   "host2_hair"
    t.text     "host2_other"
    t.boolean  "man_valid"
    t.string   "man_gender"
    t.string   "man_height"
    t.string   "man_hair"
    t.text     "man_other"
    t.boolean  "ser_valid"
    t.string   "ser_gender"
    t.string   "ser_height"
    t.string   "ser_hair"
    t.text     "ser_other"
    t.text     "department_descriptions"
  end

  create_table "evaluations", force: true do |t|
    t.integer  "restaurant_id"
    t.integer  "standard_id"
    t.string   "status"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "message"
  end

  create_table "keys", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "questions", force: true do |t|
    t.string   "body"
    t.string   "standards"
    t.string   "department"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "key"
  end

  create_table "restaurants", force: true do |t|
    t.integer  "user_id"
    t.string   "name"
    t.string   "phone_number"
    t.string   "address"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "url"
    t.string   "email"
    t.string   "password_digest"
    t.string   "temp_password"
    t.boolean  "admin"
    t.text     "additional_emails"
  end

  create_table "standards", force: true do |t|
    t.string   "name"
    t.text     "details"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email"
    t.string   "password_digest"
    t.string   "account"
    t.string   "phone_number"
    t.string   "address"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.string   "first_name"
    t.string   "last_name"
    t.boolean  "admin"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "status"
    t.boolean  "email_confirmation"
  end

end
