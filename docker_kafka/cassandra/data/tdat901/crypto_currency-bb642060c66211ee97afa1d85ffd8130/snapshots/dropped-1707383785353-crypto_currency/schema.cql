CREATE TABLE IF NOT EXISTS tdat901.crypto_currency (
    id uuid PRIMARY KEY,
    fullname text,
    image text,
    lastvolume float,
    maxsupply float,
    price float,
    record_date date,
    record_time time,
    symbol text,
    top24h float,
    volume24h float,
    volumeday float,
    volumehour float
) WITH ID = bb642060-c662-11ee-97af-a1d85ffd8130
    AND additional_write_policy = '99p'
    AND bloom_filter_fp_chance = 0.01
    AND caching = {'keys': 'ALL', 'rows_per_partition': 'NONE'}
    AND cdc = false
    AND comment = ''
    AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4'}
    AND compression = {'chunk_length_in_kb': '16', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor'}
    AND memtable = 'default'
    AND crc_check_chance = 1.0
    AND default_time_to_live = 0
    AND extensions = {}
    AND gc_grace_seconds = 864000
    AND max_index_interval = 2048
    AND memtable_flush_period_in_ms = 0
    AND min_index_interval = 128
    AND read_repair = 'BLOCKING'
    AND speculative_retry = '99p';
