
-- This file is generated by the DataFiller free software.
-- This software comes without any warranty whatsoever.
-- Use at your own risk. Beware, this script may destroy your data!
-- License is GPLv3, see http://www.gnu.org/copyleft/gpl.html
-- Get latest version from http://www.coelho.net/datafiller.html

-- Data generated by: /usr/local/bin/datafiller
-- Version 2.0.1-dev (r832 on 2015-11-01)
-- For postgresql on 2017-05-03T12:34:39.879063 (UTC)
-- 
\echo # filling table data.todo (6)
COPY data.todo (todo, completed) FROM STDIN (FREEZE ON);
item_1	FALSE
item_2	TRUE
item_3	FALSE
item_4	TRUE
item_5	TRUE
item_6	FALSE
\.
-- 
-- analyze modified tables
ANALYZE data.todo;
